import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

import MissionService from '@/services/missionService';
import NatureMisService from '@/services/nature_missionService';
import CityService from '@/services/cityService';
import TransportService from '@/services/transportService';
import ExpenseService from '@/services/expenseService';
import { exportToPDF } from '@/services/pdfService';

import useUserData from '@/hooks/useUserData';
import { Error, Loading } from '../loadingError/loadingErrorComponent';

import Utils from '@/utils/utils';
import "@/components/expenses/expense.css";

export default function expenseGestion(props) {

    const [missions, setMissions] = useState([]);
    const [natureMissions, setNatureMissions] = useState([]);
    const [cities, setCities] = useState([]);
    const [transports, setTransports] = useState([]);
    const [expenseReports, setExpenseReports] = useState([]);
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 5;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const lastIndex = currentPage * maxPerPage;
    const firstIndex = lastIndex - maxPerPage;
    const dataPageExpense = [...missions].slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(missions.length / maxPerPage);

    // Utilisation du hook useUserData
    const { userData, loading, error } = useUserData();

    // Chargement des données nécessaires
    async function fetchData(userId) {
        const missionsData = await MissionService.loadMissionsFilterByUser(userId);;
        const natureMissionsData = await NatureMisService.loadNaturesMis();
        const citiesData = await CityService.loadCities();
        const transportsData = await TransportService.loadTransports();
        const expenseReportsData = await ExpenseService.loadAllExpensesForUser(userId);

        setMissions(missionsData);
        setNatureMissions(natureMissionsData);
        setCities(citiesData);
        setTransports(transportsData);
        setExpenseReports(expenseReportsData);
    }

    // Charge les données utilisateur et appel fetchData
    useEffect(() => {
        if (userData) {
            fetchData(userData.id);
        }
    }, [userData]);

    const router = useRouter();

    // Redirige vers la page de gestion des dépenses pour une mission donnée
    const redirectToExpensePage = (missionId) => {
        router.push(`/expense/${missionId}`);
    };

    // Gére l'exportation des données au format PDF
    const handleExportToPDF = async (event) => {
        const missionId = event.currentTarget.getAttribute("data-mission-id");

        if (!userData.id) {
            console.error("L'ID de l'utilisateur n'est pas défini");
            return;
        }

        // Récupération des frais associés à la mission et à l'utilisateur
        const mission = await MissionService.loadOneMission(userData.id, missionId);
        const expenses = await ExpenseService.loadExpensesFromOneMission(userData.id, missionId);
        const natureInit = await NatureMisService.loadOneNatureMission(mission[0].init_nat_mis_id);

        // Génération du PDF
        exportToPDF(mission, expenses, natureInit[0]);
    };

    // Pour gérer l'état de chargement
    if (loading) {
        return <Loading />;
    }

    // Pour gérer l'état d'erreur
    if (error) {
        return <Error />;
    }

    const NOT_SPECIFIED = "Non spécifié";
    //const sortedMissions = missions.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

    return (
        <>
            <h1 >Gestion des notes de frais</h1>
            <div className="d-flex flex-column justify-content-center my-4">
                <div className="text-center my-4 mx-4">
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th className="table-subtitle">Date de début</th>
                                <th className="table-subtitle">Date de fin</th>
                                <th className="table-subtitle">Nature</th>
                                <th className="table-subtitle">Départ</th>
                                <th className="table-subtitle">Arrivée</th>
                                <th className="table-subtitle">Transport</th>
                                <th className="table-subtitle">Frais</th>
                                <th className="table-subtitle">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPageExpense.map(mission => (
                                <tr key={mission.id}>
                                    <td>{Utils.formatDateTimestampToStr(mission.start_date)}</td>
                                    <td>{Utils.formatDateTimestampToStr(mission.end_date)}</td>

                                    <td>{Utils.capitalizeFirstLetter(natureMissions.find(natexp => natexp.id === mission.nature_mission_id)?.name) || NOT_SPECIFIED}</td>

                                    <td>{Utils.capitalizeFirstLetter(cities.find(city => city.id === mission.departure_city_id)?.name) || NOT_SPECIFIED}</td>

                                    <td>{Utils.capitalizeFirstLetter(cities.find(city => city.id === mission.arrival_city_id)?.name) || NOT_SPECIFIED}</td>

                                    <td>{Utils.capitalizeFirstLetter(transports.find(transport => transport.id === mission.transport_id)?.name) || NOT_SPECIFIED}</td>

                                    <td>{Utils.formatAmount(expenseReports
                                        // Filtre pour avoir les dépenses de la mission actuelle
                                        .filter(expense => expense.mission_id === mission.id)
                                        // Somme tous les montants des dépenses de cette mission sinon 0
                                        .reduce((acc, expense) => acc + expense.amount, 0))}€</td>

                                    <td >
                                        {/* Si date de fin < à date du jour (true) alors les boutons s'affichent */}
                                        {new Date(mission.end_date) < new Date() && (
                                            <div className="button-container-gestion">
                                                <button className="button_icon button_gestion" onClick={() => redirectToExpensePage(mission.id)}><AddCircleIcon />
                                                </button>
                                                <button className="button_icon button_pdf" data-mission-id={mission.id} onClick={handleExportToPDF}>
                                                    <PictureAsPdfIcon />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Pagination.Item key={index +1} active={index +1 === currentPage} onClick={() => handlePageChange(index +1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}