"use client";
import React, { useEffect, useState, useRef} from 'react';

import { Table, Button } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

import ModalDeleteNatureComponent from '@/components/natures/ModalDeleteNatureMission';
import ModalRootComponent from '@/components/modals/modalRootComponent';
import ModalChildComponent from '@/components/modals/modalChildAddNatureComponent';
import ModalChildEditComponent from '../modals/modalChildEditNatureComponent';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

import NatureMissionService from '@/services/nature_missionService';

import Utils from '@/utils/utils';

export default function NatureMission(props){
    const [listeNaturesMissions, setListeNaturesMissions] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalNature, setModalNature] = useState(null);
    const [isEditBtnDisabled, setEditBtnDisabled] = useState(true);
    const [modalChild, setModalChild] = useState(<></>);
    const [modalTitle, setModalTitle] = useState("");
    const [modalType, setModalType] = useState('');
    const [modalBtnLabel, setModalBtnLabel] = useState('');
    const [refreshDisplay, setRefreshDisplay] = useState(false);
    // date du jour 
    const [dateDebut, setDateDebut] = useState('');
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 5;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const lastIndex = currentPage * maxPerPage;
    const firstIndex = lastIndex - maxPerPage;
    const dataPageNatMission = listeNaturesMissions.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(listeNaturesMissions.length / maxPerPage);

    const inputNatureName = useRef(null);
    const inputNatureIsCharge = useRef(null);
    const inputNatureIsBonus = useRef(null);
    const inputNatureTJM = useRef(null);
    const inputNaturePercentage = useRef(null);
    const inputNatureStartDate = useRef();
    const inputNatureEndDate = useRef();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const dataNatures = await NatureMissionService.loadNaturesMis();
                setListeNaturesMissions(dataNatures);
                // const idVal = dataNatures.map(nature => nature.id);
                // console.log(idVal)
            } catch (error) {
                console.error("Erreur lors du chargement des natures de mission :", error);
            }
        };
        fetchData();

        let dateDuJour = new Date().toISOString().split("T")[0];
        setDateDebut(dateDuJour);
    }, [refreshDisplay]);

    const handleResetModal = (isRefresh) => {
        setModalShow(false);
        setModalChild(<></>);
        setModalTitle("");
        setModalBtnLabel("");
        setEditBtnDisabled(true);
        setModalType(<></>);
        setModalNature(null);
        if(isRefresh){
            setRefreshDisplay(!refreshDisplay);
        }
    }

    const handleModalClick = (event) => {
        if (modalType === 'add') {
            handleAddNature(event);
        } else if (modalType === 'update') {
            handleEditNature(event);
        } else if (modalType === 'delete') {
            handleDeleteNature(event);
        }
    }
    // Ajout nature
    async function handleAddNature(event){
        event.preventDefault();

        // console.log("last id "+listeNaturesMissions[listeNaturesMissions.length -1].id)
        const name = inputNatureName.current.value;
        const isCharge = inputNatureIsCharge.current.checked;
        const isBonus = inputNatureIsBonus.current.checked;
        let tjm = null; 
        let percentage = null;
        const dateDebut = inputNatureStartDate.current.value;
        const dateFin = null;

        // si facturée est = oui on affiche le tjm
        if(isCharge === true){
            tjm = parseFloat(inputNatureTJM.current.value);
        }else{// sinon on le met à null pour la bdd
            inputNatureTJM === null;
        }
        // si versement de prime est = oui on affiche le %prime
        if(isBonus === true){
            percentage = parseFloat(inputNaturePercentage.current.value);
        }else{// sinon on le met à null pour la bdd
            inputNaturePercentage === null;
        }

        if(!name || isNaN(tjm) || isNaN(percentage) || (tjm < 1 && tjm !== null) || (percentage > 10 && percentage !== null || dateFin !== null)){
           // console.log("name: ", name, " facturée: ", isCharge," prime: ",isBonus," tjm: ", tjm," percentage: ", percentage," dateDebut ", dateDebut," dateFin ", dateFin);

            // Afficher un message d'erreur si les champs ne sont pas valides
            window.alert("Veuillez remplir tous les champs correctement : le nom doit être unique, tous les champs sont obligatoires, le plafond des TJM doit être strictement positif, la valeur du % de prime doit être inférieure à 10 et la date de début doit être égale à la date du jour.");
        } else {
            // Vérifier si une nature avec le même nom existe déjà
            const natureExist = listeNaturesMissions.some(nature => nature.name === name);
            
            if (natureExist) {
                window.alert("Une nature avec ce nom existe déjà.");
            }else{
                const response = await NatureMissionService.addNature(name, isCharge, isBonus, tjm, percentage, dateDebut, dateFin);
                if(response === true){
                    window.alert("Ajout nature acceptée !");
                    // trouver le dernier id de ma liste de nature
                    const lastId = listeNaturesMissions.length > 0 ? listeNaturesMissions[listeNaturesMissions.length -1].id : 0;
                    const newId = lastId +1;
                    // console.log(newId)
                    const newNature = {
                        id: newId,
                        name: name,
                        isCharge: isCharge,
                        isBonus: isBonus,
                        tjm: tjm,
                        percentage: percentage,
                        dateDebut: dateDebut
                    };

                    // Met à jour l'état local avec la nouvelle nature ajoutée
                    setListeNaturesMissions([...listeNaturesMissions, newNature]);
                    handleResetModal(true);
                }else{
                    console.log("Error!");
                }
            }
        }
    }

    const onClickModalAdd = () => {
        setModalType('add');
        setModalChild((
            <ModalChildComponent 
                inputName={inputNatureName} 
                inputIsCharge={inputNatureIsCharge} 
                inputIsBonus={inputNatureIsBonus} 
                inputTJM={inputNatureTJM} 
                inputPercentage={inputNaturePercentage} 
                inputStartDate={inputNatureStartDate} // ajout date
                idNatureMis={listeNaturesMissions.id}
                listeNaturesMissions= {listeNaturesMissions}
            />
        ));
        setModalShow(true);
        setModalTitle("Ajouter une nature");
        setModalBtnLabel("Ajouter");
    }
    // Modification nature
    async function handleEditNature(event){
        event.preventDefault();
        const name = inputNatureName.current.value;
        const isCharge = inputNatureIsCharge.current.checked;
        const isBonus = inputNatureIsBonus.current.checked;
        let tjm = null;
        let percentage = null;
        const dateDebut = inputNatureStartDate.current.value;
        let dateFin = inputNatureEndDate.current.value;
        const dateDuJour = new Date().toISOString().split("T")[0];
        
        if(dateFin === ""){
            dateFin = null;
        }
        // si facturée est = oui on affiche le tjm
        if(isCharge === true){
            tjm = parseFloat(inputNatureTJM.current.value);
        }else{// sinon on le met à null pour la bdd
            inputNatureTJM === null;
        }
        // si versement de prime est = oui on affiche le %prime
        if(isBonus === true){
            percentage = parseFloat(inputNaturePercentage.current.value);
        }else{// sinon on le met à null pour la bdd
            inputNaturePercentage === null;
        }

        if(!name || isNaN(tjm) || isNaN(percentage) || (tjm < 1 && tjm !== null) || (percentage > 10 && percentage !== null)){
            // Afficher un message d'erreur si les champs ne sont pas valides
            window.alert("Veuillez remplir tous les champs correctement : tous les champs sont obligatoires, le plafond des TJM doit être strictement positif et la valeur du % de prime doit être inférieure à 10.");
        }else if(dateFin !== null && dateFin < dateDuJour){
            window.alert("La date de fin ne peut pas être antérieur à la date du jour.");
        }else{
            const response = await NatureMissionService.updateNature(modalNature.id, name, isCharge, isBonus, tjm, percentage, dateDebut, dateFin);
            // console.log("response:", response);
            if(response === true){
                const dataNature = await NatureMissionService.loadOneNatureMission(modalNature.id);
                setListeNaturesMissions(dataNature);
                window.alert("Modification nature acceptée !");
                handleResetModal(true);
            }else{
                console.log("Error!");
            }
        }
    }

    const onClickModalEdit = (nature_mission) => {
        // console.log(nature_mission)
        setModalNature(nature_mission);
        setModalType('update');
        setModalChild((
            <ModalChildEditComponent 
                handleSubmitAdd = {(event) => {handleEditNature(event)}}
                // mes champs de base
                inputNameEdit={inputNatureName} 
                inputIsChargeEdit={inputNatureIsCharge} 
                inputIsBonusEdit={inputNatureIsBonus} 
                inputTJMEdit={inputNatureTJM} 
                inputPercentageEdit={inputNaturePercentage}
                inputStartDate={inputNatureStartDate} // ajout dateDebut 
                inputEndDate={inputNatureEndDate} // ajout dateFin 
                idNatureMisEdit={listeNaturesMissions.id}

                listeNaturesMissions= {listeNaturesMissions}

                oldInputName = {nature_mission.name}
                oldInputIsCharge = {nature_mission.is_charge}
                oldInputIsBonus = {nature_mission.is_bonus}
                oldInputTjm = {nature_mission.tjm}
                oldInputPercentage = {nature_mission.percentage}
                oldInputEndDate = {nature_mission.end_date}
            />
        ));
        setModalShow(true);
        setModalTitle("Modifier une nature");
        setModalBtnLabel("Modifier");
    }

    // Suppression nature
    async function handleDeleteNature(event){
        event.preventDefault();

        const resDel = await NatureMissionService.deleteNature(modalNature.id);
        
        if(resDel === true) {
            setListeNaturesMissions(prevList => prevList.filter(nature => nature.id !== modalNature.id));
            handleResetModal(true); 
        } else {
            window.alert("Erreur lors de la suppréssion :", resDel);
        }
    }

    const onClickModalDelete = (nature_mission) => {
        setModalNature(nature_mission);
        setModalType('delete');
        setModalShow(true);
        setModalTitle("Supprimer une nature");
        setModalBtnLabel("Supprimer");
        setEditBtnDisabled(false);
        setModalChild((
            <ModalDeleteNatureComponent
                id={nature_mission.id}
            />
        ));
    }

    
    return (        
        <>
        <h1>Natures de mission</h1>
            <div className="d-flex flex-column justify-content-center my-4">
                <div className="text-center align-middle mb-4">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Nature</th>
                                <th>Facturée</th>
                                <th>Versement prime</th>
                                <th>TJM (€)</th>
                                <th>% Prime</th>
                                <th>Date de début</th>
                                <th>Date de fin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPageNatMission.map((nature_mission) =>{
                                return(
                                    <tr key={nature_mission.id}>   
                                    {/* {console.log(nature_mission.id)} */}
                                        <td className="align-middle">
                                            {Utils.capitalizeFirstLetter(nature_mission.name)}
                                        </td>
                                        <td className="align-middle">{/* facturée */}
                                            {nature_mission.is_charge === 1 ? 'Oui' : 'Non'}
                                        </td>
                                        <td className="align-middle">{/* prime */}
                                            {nature_mission.is_bonus === 1 ? 'Oui' : 'Non'}
                                        </td>
                                        <td className="align-middle">{/* TJM €*/}
                                            {nature_mission.tjm !== null ? Utils.formatAmount(nature_mission.tjm)+ " €" : "-"}
                                        </td>
                                        <td className="align-middle">{/* % prime */}
                                            {nature_mission.percentage !== null ? Utils.formatAmount(nature_mission.percentage)+" %" : "-"}
                                        </td>
                                        <td className="align-middle">
                                            {Utils.formatDateTimestampToStr(nature_mission.start_date)}
                                        </td>
                                        <td className="align-middle">
                                            {nature_mission.end_date !== null ? Utils.formatDateTimestampToStr(nature_mission.end_date) : "-"}
                                        </td>
                                        <td>
                                            <button className="button_icon button_edit" onClick={() => onClickModalEdit(nature_mission)} >
                                                <EditIcon className="icon_edit" />
                                            </button>
                                            <button className="button_icon button_delete" onClick={() => onClickModalDelete(nature_mission)}>
                                                <DeleteIcon className="icon_delete" />
                                            </button>
                                        </td>
                                    </tr>
                                )                    
                            })}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            {Array.from({length: totalPages}).map((_, index) => (
                                <Pagination.Item key={index +1} active={index +1 === currentPage} onClick={() => handlePageChange(index +1)} >
                                    {index +1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
                <section className="d-flex justify-content-center">
                    <button className="button_add" onClick={() => onClickModalAdd()}>
                    Ajouter une nature de mission : <AddCircleIcon />
                    </button>
                </section>
                    <ModalRootComponent
                        show = {modalShow}
                        onHide = {() => handleResetModal(false)}
                        title = {modalTitle}
                        childmodal = {modalChild}
                        footerbuttons = {(
                            <>
                                <Button className="btn-modal-success" type="submit"  onClick={(event) => {handleModalClick(event)}}>{modalBtnLabel}</Button>

                                <Button className="btn-modal-cancel" onClick= {() =>{handleResetModal(false)}}>Annuler</Button>
                            </>
                        )}
                    />
            </div>
        </>
    );
}