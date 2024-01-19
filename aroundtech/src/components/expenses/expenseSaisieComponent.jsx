'use client'

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link'
import { Table, Button } from 'react-bootstrap';
import { useRouter } from "next/navigation";

import ModalRootComponent from '@/components/modals/modalRootComponent';
import ModalChildEditComponent from '@/components/modals/modalChildEditExpenseComponent';
import ModalChildDeleteComponent from '../modals/modalChildDelete';
import ModalChildValidExpenseComponent from '@/components/modals/modalChildValidExpenseComponent';

import MissionService from '@/services/missionService';
import ExpenseService from '@/services/expenseService';
import NatureMisService from '@/services/nature_missionService';
import NatureExpService from '@/services/nature_expenseService';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

import useUserData from '@/hooks/useUserData';
import { Error, Loading } from '../loadingError/loadingErrorComponent';

import Utils from '@/utils/utils';
import "@/components/expenses/expense.css";

export default function ExpenseSaisie(props) {

    //// Setters && Getters for display
    const [aMission, setAMission] = useState({});
    const [aNatMisInit, setANatMisInit] = useState({});
    const [lstExpenses, setLstExpenses] = useState([]);
    //  const [lstNaturesExp, setLstNaturesExp] = useState([]);
    const [refreshDisplay, setRefreshDisplay] = useState(false);
    const [infosPrime, setInfosPrime] = useState({});


    // Utilisation du hook useUserData
    const { userData, loading, error } = useUserData();


    ////  Setters && Getters for modals
    const [isEditBtnDisabled, setIsEditBtnDisabled] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalChild, setModalChild] = useState(<></>);
    const [modalTitle, setModalTitle] = useState("");
    const [modalType, setModalType] = useState('');
    const [modalBtnLabel, setModalBtnLabel] = useState('');
    const [modalExpense, setModalExpense] = useState(null);

    const inputDateEdit = useRef(null);
    const inputNatExpEdit = useRef(null);
    const inputAmountEdit = useRef(null);


    ////  Props && Globals
    const idMission = props.idMission;
    const searchParams = props.searchParams;
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (userData) {

                const dataMission = await MissionService.loadOneMission(userData.id, idMission);
                setAMission(dataMission[0]);

                if (dataMission[0]) {


                    const dataNatMisInit = await NatureMisService.loadOneNatureMission(dataMission[0].init_nat_mis_id);
                    setANatMisInit(dataNatMisInit[0]);

                    const dataExpenses = await ExpenseService.loadExpensesFromOneMission(userData.id, idMission, searchParams);
                    setLstExpenses(dataExpenses);

                    const dataNatures = await NatureExpService.loadNaturesExp();
                    // setLstNaturesExp(dataNatures);

                    const dataPrime = validExpenses(dataNatures, dataExpenses, dataMission[0], dataNatMisInit[0]);
                    setInfosPrime(dataPrime);

                } else{
                    // Redirige vers la page de gestion des dépenses
                    router.push('/expense/');
                }
            }
        })();

    }, [userData, refreshDisplay]);

    // Gérer l'état de chargement
    if (loading) {
        return <Loading />;
    }

    // Gérer l'état d'erreur
    if (error) {
        return <Error />;
    }

    ////  Reset Modal
    const handleResetModal = (isRefresh) => {

        setModalShow(false);
        setModalChild(<></>);
        setModalTitle("");
        setModalBtnLabel("");
        setIsEditBtnDisabled(true);
        setModalType(<></>);
        setModalExpense(null);

        if (isRefresh) {
            setRefreshDisplay(!refreshDisplay);
        }

    }

    const handleModalClick = (event) => {

        if (modalType === 'add') {
            onClickAddExpense(event);
        } else if (modalType === 'update') {
            onClickUpdateExpense(event);
        } else if (modalType === 'delete') {
            onClickDeleteExp(event);
        } else if (modalType === 'valid') {
            onClickValidExpenses(event);
        }
    }


    //// ADD Expense
    async function onClickAddExpense(event) {

        event.preventDefault();
        //console.log(`inputNatExpEdit.current`, inputNatExpEdit.current)
        if (inputDateEdit.current && inputNatExpEdit.current && inputAmountEdit) {

            const selectedIndexNatExp = inputNatExpEdit.current.selectedIndex;

            let idNat = 0
            if (selectedIndexNatExp !== 0) {
                idNat = inputNatExpEdit.current[selectedIndexNatExp].id;
            }

            const response = await ExpenseService.addExpense(Utils.formatDateStrToTimestamp(inputDateEdit.current.value), idNat, inputAmountEdit.current.value, props.idMission, userData.id);

            if (response === true) {

                inputDateEdit.current.value = "";
                inputDateEdit.current.focus();

                inputNatExpEdit.current.value = "";
                inputNatExpEdit.current.focus();

                inputAmountEdit.current.value = "";
                inputAmountEdit.current.focus();

                handleResetModal(true);

            } else {
                alert("Erreur à la création de la note");
            } //TODO: gestion Erreur


        } else {
            console.log(`Erreur à la récupération des infos de la note de frais!!`, event);
        }
    }

    const onClickShowModalAdd = () => {

        setModalType('add');
        setModalChild((
            <ModalChildEditComponent

                isBtnDisabled={(boolValid) => { setIsEditBtnDisabled(boolValid) }}

                inputDateEdit={inputDateEdit}
                inputNatExpEdit={inputNatExpEdit}
                inputAmountEdit={inputAmountEdit}

                dateValue={Utils.formatDateToISO(aMission.start_date)}
                maxDate={Utils.formatDateToISO(aMission.end_date)}
                minDate={Utils.formatDateToISO(aMission.start_date)}

                lstExpenses={lstExpenses}
            />
        ));
        setModalShow(true);
        setModalTitle("Ajouter un frais");
        setModalBtnLabel("Ajouter");

    }


    //// UPDATE Expense 
    async function onClickUpdateExpense(event) {

        event.preventDefault();

        const selectedIndexNatExp = inputNatExpEdit.current.selectedIndex;
        let idNat = 0
        if (selectedIndexNatExp !== 0) {
            if (selectedIndexNatExp !== 0) {
                idNat = inputNatExpEdit.current[selectedIndexNatExp].id;
            }
        }

        if (inputDateEdit.current && inputNatExpEdit.current && inputAmountEdit && idNat !== 0 && modalExpense.id !== undefined) {

            const response = await ExpenseService.updateOneExpense(Utils.formatDateStrToTimestamp(inputDateEdit.current.value), idNat, inputAmountEdit.current.value, userData.id, props.idMission, modalExpense.id);

            if (response === true) {

                inputDateEdit.current.value = "";
                inputDateEdit.current.focus();

                inputNatExpEdit.current.value = "";
                inputNatExpEdit.current.focus();

                inputAmountEdit.current.value = "";
                inputAmountEdit.current.focus();

                const dataExpenses = await ExpenseService.loadExpensesFromOneMission(userData.id, idMission, searchParams);
                setLstExpenses(dataExpenses);
                handleResetModal(true);

            } else {
                alert("Erreur à la update de la note");
            } //TODO: gestion Erreur


        } else {
            console.log(`Erreur à la récupération des infos de la note de frais!!`, event);
        }
    }

    const onClickShowModalUpdate = (expense) => {

        setModalExpense(expense)
        setModalType('update');
        setIsEditBtnDisabled(false);
        setModalChild((
            <ModalChildEditComponent

                isBtnDisabled={(boolValid) => { setIsEditBtnDisabled(boolValid) }}
                handleSubmitAdd={(event) => { onClickUpdateExpense(event) }}

                inputDateEdit={inputDateEdit}
                inputNatExpEdit={inputNatExpEdit}
                inputAmountEdit={inputAmountEdit}

                dateValue={Utils.formatDateToISO(expense.created_at)}
                maxDate={Utils.formatDateToISO(aMission.end_date)}
                minDate={Utils.formatDateToISO(aMission.start_date)}

                lstExpenses={lstExpenses}

                oldValueDate={expense.created_at}
                oldValueNat={expense.nat_exp_name}
                oldValueAmount={expense.amount.toFixed(2)}

                isUpdate={true}
            />
        ));
        setModalShow(true);
        setModalTitle("Modifier un frais");
        setModalBtnLabel("Modifier");
    }


    //// DELETE Expense
    async function onClickDeleteExp(event) {

        event.preventDefault();

        const res = await ExpenseService.deleteExpense(userData.id, idMission, modalExpense.id);

        if (!res) {
            alerte("Erreur à la suppression : ", res);
        } else {
            handleResetModal(true);
        }
    }

    const onClickShowModalDelete = (expense) => {

        const lstInfosExpenseToDelete = [
            {
                'label': "Date du frais",
                'info': Utils.formatDateTimestampToStr(expense.created_at)
            },
            {
                'label': "Nature du frais",
                'info': Utils.capitalizeFirstLetter(expense.nat_exp_name)
            },
            {
                'label': "Dépense",
                'info': Utils.formatAmount(expense.amount)
            },
        ];

        setModalExpense(expense)
        setModalType('delete');
        setModalShow(true);
        setModalTitle("Supprimer un frais");
        setModalBtnLabel("Supprimer");
        setIsEditBtnDisabled(false);
        setModalChild((
            <ModalChildDeleteComponent
                lstInfosToDelete={lstInfosExpenseToDelete}
            />
        ));

    }


    //// VALID Expense
    async function onClickValidExpenses(event) {

        event.preventDefault();

        const response = await ExpenseService.updateDateExpenses(lstExpenses, userData.id, aMission.id);

        if (response === true) {

            const dataExpenses = await ExpenseService.loadExpensesFromOneMission(userData.id, idMission, searchParams);
            setLstExpenses(dataExpenses);
            handleResetModal(true);

        } else {
            alert("Erreur à la update de la note");
        } //TODO: gestion Erreur


    }

    const onClickShowModalValid = () => {
        setModalExpense(lstExpenses);
        setModalType('valid');
        setModalShow(true);
        setModalTitle("Valider la note de frais");
        setModalBtnLabel("Valider");
        setIsEditBtnDisabled(false);
        setModalChild((
            <ModalChildValidExpenseComponent
                expenseT={infosPrime.expTotal}
                expenseD={infosPrime.expDeduc}
                primeF={infosPrime.prime}
            />
        ));

    }


    if (aMission !== undefined) {
        return (
            <>
                <div id="title-cont">
                    <Link className="button_add" href="/expense" id="link-return"><KeyboardReturnRoundedIcon /></Link>
                    <h1>Saisie des notes de Frais</h1>
                </div>

                <div id="infos-mission-cont">

                    <div className='infos-mission-a'>
                        <div className="infos-mission">
                            <p className="label-info-mission">Date de début</p>
                            <p className="data-info-mission"> {aMission.start_date !== undefined ? Utils.formatDateTimestampToStr(aMission.start_date) : ""}</p>
                        </div>

                        <div className="infos-mission">
                            <p className="label-info-mission">Date de fin</p>
                            <p className="data-info-mission">{aMission.end_date !== undefined ? Utils.formatDateTimestampToStr(aMission.end_date) : ""}</p>
                        </div>

                        <div className="infos-mission">
                            <p className="label-info-mission">Nature</p>
                            <p className="data-info-mission">{aMission.nat_mis_name !== undefined ? Utils.capitalizeFirstLetter(aMission.nat_mis_name) : ""}</p>
                        </div>
                    </div>

                    <div className='infos-mission-b'>
                        <div className="infos-mission">
                            <p className="label-info-mission">Estimation prime</p>
                            <p className="data-info-mission">
                                {
                                    aMission.nat_mis_percent !== undefined && aNatMisInit.id !== undefined && lstExpenses[0] !== undefined && lstExpenses[0].valid_at === null ? (infosPrime.prime + " €") : (parseFloat(infosPrime.prime - infosPrime.expDeduc).toFixed(2) + "€")
                                }
                            </p>
                        </div>

                        <div className="infos-mission">
                            <p className="label-info-mission">Ville de départ</p>
                            <p className="data-info-mission">{aMission.city_arr_name !== undefined ? Utils.capitalizeFirstLetter(aMission.city_arr_name) : ""}</p>
                        </div>

                        <div className="infos-mission">
                            <p className="label-info-mission">Ville d'arrivée</p>
                            <p className="data-info-mission">{aMission.city_dep_name !== undefined ? Utils.capitalizeFirstLetter(aMission.city_dep_name) : ""}</p>
                        </div>
                    </div>

                </div>

                <section className="d-flex justify-content-center">
                    {
                        (lstExpenses !== undefined || lstExpenses.length !== 0) && (<button className="button_add" onClick={() => onClickShowModalValid()}>
                            Valider la note de frais : <CheckCircleIcon />
                        </button>)
                    }
                </section>

                <div className="d-flex flex-column justify-content-center my-4">
                    <div className="text-center my-4 mx-4">
                        <Table responsive>

                            <thead>
                                <tr>
                                    <th className="table-subtitle">Date</th>
                                    <th className="table-subtitle">Nature</th>
                                    <th className="table-subtitle">Montant (€)</th>
                                    <th className="table-subtitle">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {(lstExpenses === undefined || lstExpenses.length === 0) && (
                                    <tr>
                                        <td colSpan={8} className="text-center">
                                            Aucun résultat
                                        </td>
                                    </tr>
                                )}

                                {lstExpenses !== undefined && lstExpenses.length !== 0 &&
                                    lstExpenses.map((expense) => {
                                        return (

                                            <tr key={expense.id}>
                                                <td>{Utils.formatDateTimestampToStr(expense.created_at)}</td>
                                                <td>{expense !== undefined ? Utils.capitalizeFirstLetter(expense.nat_exp_name) : "n"}</td>
                                                <td>{Utils.formatAmount(expense.amount) + " €"}</td>
                                                <td>

                                                    <button className="button_icon button_edit">
                                                        <EditIcon className="icon_edit" onClick={() => onClickShowModalUpdate(expense)} />
                                                    </button>

                                                    <button className="button_icon button_delete" onClick={() => {
                                                        onClickShowModalDelete(expense)
                                                    }}>

                                                        <DeleteIcon className="icon_delete" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                            </tbody>

                        </Table>
                    </div>
                </div>

                <section className="d-flex justify-content-center mb-4">
                    <button className="button_add" onClick={() => onClickShowModalAdd()}>
                        Ajouter un frais : <AddCircleIcon />
                    </button>
                </section>

                <div id="modal-add-cont">

                    <ModalRootComponent
                        show={modalShow}
                        onHide={() => handleResetModal(false)}
                        title={modalTitle}
                        childmodal={modalChild}
                        footerbuttons={(
                            <>

                                <Button
                                    className="btn-modal-success"
                                    disabled={isEditBtnDisabled}
                                    type="submit"
                                    onClick={(event) => { handleModalClick(event) }}
                                >
                                    {modalBtnLabel}
                                </Button>

                                <Button className="btn-modal-cancel" onClick={() => { handleResetModal(false) }}>Annuler</Button>
                            </>
                        )}

                    />
                </div>

            </>
        );
    }


    return (<></>);

}


function validExpenses(lstNaturesExp, lstExpenses, mission, natMisInit) {

    let sumExpenseT = 0;
    let deduction = 0;


    for (let nature of lstNaturesExp) {

        let sumExpenseByNat = 0;

        const lstExpenseFilterByNat = lstExpenses.filter(exp => exp.nature_expense_id === nature.id);
        const nbWorkingDays = Utils.getNbWorkingDate(mission);
        const maxSumNat = nbWorkingDays * nature.cap_value;

        for (let exp of lstExpenseFilterByNat) {
            sumExpenseByNat += exp.amount;
        }

        if (nature.is_capped && sumExpenseByNat > maxSumNat) {
            deduction = sumExpenseByNat - maxSumNat;
        }




        sumExpenseT += sumExpenseByNat;
    }

    const infosPrime = {
        'expTotal': sumExpenseT,
        'expDeduc': deduction,
        'prime': parseFloat(Utils.getPrime(mission, natMisInit)).toFixed(2)
    }

    return infosPrime;
}