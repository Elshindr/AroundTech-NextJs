"use client";
import { useState, useEffect } from "react";
import React from "react";
import MissionService from "@/services/missionService";
import LeaveService from "@/services/leaveService";
import MissionTable from "@/components/missions/MissionTable";
import ModalDeleteMission from "@/components/missions/delete/ModalDeleteMission";
import ModalAddMission from "@/components/missions/add/ModalMission";
import ModalUpdateMission from "@/components/missions/add/ModalMission";
import ModalInformation from "@/components/missions/information/ModalInformation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StatusService from "@/services/statusService";
import useUserData from "@/hooks/useUserData";
import {
  Error,
  Loading,
} from "@/components/loadingError/loadingErrorComponent";

const MissionsPage = () => {
  const [missions, setMissions] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [reloadTable, setReloadTable] = useState(true);

  const [idMission, setIdMission] = useState(null);
  const [idUser, setIdUser] = useState(null);

  const [modalState, setModalState] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(undefined);

  // Utilisation du hook useUserData
  const { userData, loading, error } = useUserData();

  //Récupère l'id de l'utilisateur connecté
  // Charge les données utilisateur et appel fetchData
  useEffect(() => {
    if (userData) {
      setIdUser(userData.id);
    }
  }, [userData]);

  //loading missions data
  useEffect(() => {
    if (reloadTable || userData) {
      (async () => {
        const data = await MissionService.loadMissionsFilterByUser(idUser);
        setMissions(data);
      })();
      setReloadTable(false);
    }
  }, [reloadTable, userData]);

  //loading leaves data
  useEffect(() => {
    (async () => {
      const datas = await LeaveService.loadLeaves();
      const status = await StatusService.loadStatusByName("valid");
      //Récupère seulement les données sur l'utilisateur connecté et dont le statut est validé
      const filteredLeaves = datas.filter(
        (leave) => leave.id_user === idUser && leave.status === status[0].id
      );
      //change id status by name
      const updatedLeaves = filteredLeaves.map((leave) => {
        return { ...leave, status: status[0].name };
      });
      setLeaves(updatedLeaves);
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

  return (
    <div>
      <h1>Gestion des missions</h1>

      <div className="d-flex flex-column justify-content-center my-4">
        <div className="text-center my-4 mx-4">
          <MissionTable
            missions={missions}
            leaves={leaves}
            setShowDeleteModal={setShowDeleteModal}
            setShowUpdateModal={setShowUpdateModal}
            setSelectedLeave={setSelectedLeave}
            setModalState={setModalState}
            setIdMission={setIdMission}
          />
        </div>
        <div className="col-8 m-auto">
          <div className="d-flex justify-content-center">
            <button
              className="button_add"
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              Demander une mission <AddCircleIcon />
            </button>
          </div>
        </div>
      </div>
      <ModalDeleteMission
        show={showDeleteModal}
        onReload={() => {
          setReloadTable(true);
        }}
        onHide={() => {
          setShowDeleteModal(false);
        }}
        id={idMission}
        title="Attention"
      />
      <ModalAddMission
        show={showAddModal}
        onReload={() => {
          setReloadTable(true);
        }}
        onHide={() => {
          setShowAddModal(false);
        }}
        id={null}
        title="Demander une mission"
      />
      <ModalUpdateMission
        show={showUpdateModal}
        onReload={() => {
          setReloadTable(true);
        }}
        onHide={() => {
          setShowUpdateModal(false);
        }}
        id={idMission}
        title="Modifier une mission"
      />
      {selectedLeave &&
        <ModalInformation
          show={modalState}
          information={selectedLeave}
          onHide={() => {
            setModalState(false);
          }}
        />
      }
      
    </div>
  );
};

export default MissionsPage;
