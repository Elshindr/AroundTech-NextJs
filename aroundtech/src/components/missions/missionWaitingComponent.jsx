import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from 'react-bootstrap/Pagination';

import MissionService from "@/services/missionService";
import NatureMisService from '@/services/nature_missionService';
import CityService from '@/services/cityService';
import TransportService from '@/services/transportService';
import CronService from '@/services/cronService';
//import StatusService from "@/services/statusService";

import UpdateIcon from '@mui/icons-material/Update';
import Button from 'react-bootstrap/Button';

import useUserData from "@/hooks/useUserData";
import { Error, Loading } from "../loadingError/loadingErrorComponent";

import Utils from '@/utils/utils';
import ConfirmationDialog from "../dialog/ConfirmationDialog";

export default function missionWaiting() {
  // missions ayant le statut en attente (id = 2) // TODO à améliorer si temps
  const missionStatus = 2;
  const NOT_SPECIFIED = "Non spécifié";

  const [missions, setMissions] = useState([]);
  const [natureMissions, setNatureMissions] = useState([]);
  const [cities, setCities] = useState([]);
  const [transports, setTransports] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const [managerId, setManagerId] = useState(null);
  //const [missionStatus, setMissionStatus] = useState(null);

  // Utilisation du hook useUserData
  const { userData, loading, error } = useUserData();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const maxPerPage = 5;
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };
  const lastIndex = currentPage * maxPerPage;
  const firstIndex = lastIndex - maxPerPage;
  const dataPageMission = [...missions].slice(firstIndex, lastIndex);
  const totalMission = missions.length;
  const totalPages = Math.ceil(totalMission / maxPerPage);
  
  // Charge les informations de l'utilisateur connecté
  useEffect(() => {
    if (userData && userData.role.name === "gestion") {
      setManagerId(userData.id); // Met à jour l'ID du gestionnaire
    }
  }, [userData]);

  // async function loadStatus() {
  //   const status = await StatusService.loadStatusByName("attente"); 
  //   console.log('Status reçu :', status);

  //   if (status && status.id) {
  //     setMissionStatus(status.id);
  //   } else {
  //     console.error('Failed to load status');
  //   }

  // Charge les missions une fois l'ID du manager défini
  useEffect(() => {
    if (managerId) {
      async function fetchMissions() {
        const missionsData = await MissionService.getMissionsForManager(managerId, missionStatus);
        const natureMissionsData = await NatureMisService.loadNaturesMis();
        const citiesData = await CityService.loadCities();
        const transportsData = await TransportService.loadTransports();

        setMissions(missionsData);
        setNatureMissions(natureMissionsData);
        setCities(citiesData);
        setTransports(transportsData);
      }
console.log(totalPages)
      fetchMissions();
    }
  }, [managerId, missionStatus]);
  // console.log('managerId : ', managerId);
  // console.log('missionStatus : ', missionStatus);

  // Fonction pour gérer la validation ou le rejet des missions
  const handleValidation = async (missionId, statusId) => {
    try {
      await MissionService.updateMissionStatus(missionId, statusId);
      // Après la mise à jour, actualisation de la liste des missions
      const updatedMissions = await MissionService.getMissionsForManager(managerId, missionStatus);
      setMissions(updatedMissions);
    } catch (error) {
      console.error("Erreur dans updateMissionStatus", error);

    }
  };

  // Fonctions  pour ouvrir et fermer la boîte de dialogue de confirmation
  const handleOpenDialog = (missionId, statusId) => {
    setSelectedMission({ id: missionId, status: statusId });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedMission(null);
    setOpenDialog(false);
  };

  // Pour confirmer l'action de validation ou de rejet
  const handleConfirmAction = async () => {
    if (selectedMission) {
      await handleValidation(selectedMission.id, selectedMission.status);
    }
    handleCloseDialog();
  };

    // Gérer l'état de chargement
    if (loading) {
      return <Loading />;
    }
  
    // Gérer l'état d'erreur
    if (error) {
      return <Error />;
    }

  return (
    <>
      <h1 id="titleNature">Validations des missions</h1>

      <Button  className="button_add mx-5" onClick={ () =>CronService.launchCron() } >Traitement de nuit <UpdateIcon /></Button>

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
                <th className="table-subtitle">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataPageMission.map((mission) => (
                <tr key={mission.id}>
                  <td>{Utils.formatDateTimestampToStr(mission.start_date)}</td>
                  <td>{Utils.formatDateTimestampToStr(mission.end_date)}</td>
                  <td>{Utils.capitalizeFirstLetter(natureMissions.find(natexp => natexp.id === mission.nature_mission_id)?.name) || NOT_SPECIFIED}</td>
                  <td>{Utils.capitalizeFirstLetter(cities.find(city => city.id === mission.departure_city_id)?.name) || NOT_SPECIFIED}</td>
                  <td>{Utils.capitalizeFirstLetter(cities.find(city => city.id === mission.arrival_city_id)?.name) || NOT_SPECIFIED}</td>
                  <td>{Utils.capitalizeFirstLetter(transports.find(transport => transport.id === mission.transport_id)?.name) || NOT_SPECIFIED}</td>
                  <td >
                    <div className="button-container-gestion">
                      <button className="button_icon button_edit" onClick={() => handleOpenDialog(mission.id, 3)}><DoneIcon className="icon_edit" />
                      </button>
                      <button className="button_icon button_delete" onClick={() => handleOpenDialog(mission.id, 6)}>
                        <ClearIcon className="icon_delete" />
                      </button>
                    </div>

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


      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
        title={selectedMission && selectedMission.status === 3 ? "Valider la mission" : "Rejeter la mission"}
        message={selectedMission && selectedMission.status === 3 ? "Êtes-vous sûr de vouloir accepter cette mission ?" : "Êtes-vous sûr de vouloir rejeter cette mission ?"}
        confirmButtonText="Oui"
        cancelButtonText="Annuler"
      />
    </>
  )
}