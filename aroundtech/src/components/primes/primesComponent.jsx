'use client'

import React, { useEffect, useState, useRef } from 'react';

import { Table } from 'react-bootstrap';

import MissionService from '@/services/missionService';
import NatureMisService from '@/services/nature_missionService';

import Chart from 'chart.js/auto'
import exportToXls from '@/app/lib/xlsExport';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';


import useUserData from '@/hooks/useUserData';
import { Error, Loading } from '../loadingError/loadingErrorComponent';

import Utils from '@/utils/utils';
import "@/components/primes/primes.css";

export default function Primes(props) {

    // Utilisation du hook useUserData
    const { userData, loading, error } = useUserData();

    //// Setters && Getters for display
    const [lstMissionsAll, setLstMissionsAll] = useState([]);
    const [lstMissionsOneYear, setLstMissionsOneYear] = useState([]);
    const [lstNatMis, setLstNatMis] = useState([]);

    const [lstYears, setLstYears] = useState([]);
    const [yearValue, setYearValue] = useState("");
    const [chart, setChart] = useState(null);

    const inputYear = useRef(null);
    const inputGraph = useRef(null);



    useEffect(() => {

        (async () => {

            if (userData) {

                let dataMissionsAll = await MissionService.loadMissionsFilterByUser(userData.id);
                dataMissionsAll = dataMissionsAll.filter(mis => new Date(mis.end_date) < new Date())
                setLstMissionsAll(dataMissionsAll);

                const dataNatMis = await NatureMisService.loadNaturesMis();
                setLstNatMis(dataNatMis);

                const dataLstYears = dataMissionsAll.map(mis => new Date(mis.end_date).getFullYear())
                    .filter((year, index, self) => self.indexOf(year) === index);
                setLstYears(dataLstYears);
            }
        })();
    }, [userData]);

    // Gérer l'état de chargement
    if (loading) {
        return <Loading />;
    }

    // Gérer l'état d'erreur
    if (error) {
        return <Error />;
    }


    //// Gestion Grap
    const onClickChangeYear = (event) => {

        event.preventDefault();

        if (chart) {
            chart.destroy();
        }

        if (inputYear.current != null) {

            const lstMissionBySelectedYear = lstMissionsAll.filter(mis => new Date(mis.end_date).getFullYear().toString(10) === inputYear.current.value);
            setLstMissionsOneYear(lstMissionBySelectedYear);


            let dataGraph = [];

            const lstMonths = Array.from({ length: 12 }, (_, i) => format(new Date(2023, i, 1), 'MMMM', { locale: fr }));
            lstMonths.forEach(month => {

                let dataMonth = {
                    "month": month,
                    "prime": 0
                }

                lstMissionBySelectedYear.filter(mis => format(new Date(2023, new Date(mis.end_date).getMonth(), 1), 'MMMM', { locale: fr }) === month)
                    .forEach(mis => {

                        // Get prime
                        const nature = lstNatMis.find(nat => nat.id === mis.init_nat_mis_id);
                        dataMonth.prime += Utils.getPrime(mis, nature);

                    });

                dataGraph.push(dataMonth);
            });

            setGraph(inputYear.current.value, dataGraph);

        }
    }

    const setGraph = (year, dataGraph) => {

        const ctx = inputGraph.current.getContext('2d');
        const graph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataGraph.map(data => data.month),
                datasets: [
                    {
                        label: 'Primes année ' + year,
                        data: dataGraph.map(data => data.prime),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        setChart(graph);
    }


    //// Gestion Export xls
    const onClickExport = () => {

        let jsonToExport = lstMissionsOneYear.map(mis => {
            const nature = lstNatMis.find(nat => nat.id === mis.init_nat_mis_id);
            return {
                "Date de début": Utils.formatDateTimestampToStr(mis.start_date),
                "Date de fin": Utils.formatDateTimestampToStr(mis.end_date),
                "Nature": Utils.capitalizeFirstLetter(nature.name),
                "Prime (€)": Utils.getPrime(mis, nature)
            }
        });

        exportToXls(jsonToExport);
    }


    return (
        <>
            <div>
                <h1>Récapitulatif des primes <i className="bi bi-filetype-xls"></i></h1>
            </div>

            <div id="infos-primes-cont">

                <Form>
                    <Form.Label>Année</Form.Label>
                    <Form.Select
                        className='form-data'
                        ref={inputYear}
                        value={yearValue === undefined ? "" : yearValue}
                        onChange={(e) => {
                            setYearValue(e.target.value);
                            onClickChangeYear(e);
                        }}
                    >

                        <option value=""></option>

                        {lstYears.map((year) => {
                            return (<option key={year}>{year}</option>);
                        })}

                    </Form.Select>
                </Form>
                <button
                    disabled={!(yearValue !== undefined && yearValue !== "")}
                    className='button_add'
                    onClick={() => { onClickExport() }}>
                    <FileDownloadIcon />
                </button>

            </div>


            <div id="data-primes-cont">
                <div className="d-flex flex-column justify-content-center my-4">
                    <div className="text-center my-4 mx-4">
                        <Table responsive>

                            <thead>
                                <tr>
                                    <th className="table-subtitle">Date de Début</th>
                                    <th className="table-subtitle">Date de fin</th>
                                    <th className="table-subtitle">Nature</th>
                                    <th className="table-subtitle">Prime (€)</th>
                                </tr>
                            </thead>

                            <tbody>

                                {lstMissionsOneYear === undefined || lstMissionsOneYear.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="text-center">
                                            Sélectionner une année
                                        </td>
                                    </tr>
                                )}

                                {lstMissionsOneYear !== undefined && lstMissionsOneYear.length !== 0 && yearValue !== "" &&

                                    lstMissionsOneYear.map(mis => {
                                        const nature = lstNatMis.find(nat => nat.id === mis.init_nat_mis_id);
                                        return (
                                            <tr key={mis.id}>
                                                <td>{Utils.formatDateTimestampToStr(mis.start_date)}</td>
                                                <td>{Utils.formatDateTimestampToStr(mis.end_date)}</td>
                                                <td>{nature !== undefined ? Utils.capitalizeFirstLetter(nature.name) : ""}</td>
                                                <td>{nature !== undefined ? Utils.getPrime(mis, nature) : -1}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
                    </div>
                </div>

                <div id="chart">
                    <canvas ref={inputGraph} id="graph" />
                </div>
            </div>
        </>
    );

}

