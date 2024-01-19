import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import MissionService from "@/services/missionService";
import MissionForm from "@/components/missions/add/MissionForm";
import useUserData from "@/hooks/useUserData";
import {
  Error,
  Loading,
} from "@/components/loadingError/loadingErrorComponent";

export default function ModalMission(props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [formData, setFormData] = useState({
    missionId: "",
    nature_mission_id: "",
    departure_city_id: "",
    arrival_city_id: "",
    start_date: "",
    end_date: "",
    bonus: 0,
    status_id: "",
    user_id: idUser,
    transport_id: "",
  });
  const [isAnError, setIsAnError] = useState({
    general: false,
    nature_mission_id: false,
    start_date: false,
    end_date: false,
    transport_id: false,
  });

  // Utilisation du hook useUserData
  const { userData, loading, error } = useUserData();

  //Récupère l'id de l'utilisateur connecté
  // Charge les données utilisateur et appel fetchData
  useEffect(() => {
    if (userData) {
      setIdUser(userData.id);
      setFormData((prevState) => ({
        ...prevState,
        ["user_id"]: userData.id,
      }));
    }
  }, [userData]);

  const handleCloseModal = () => {
    props.onHide();
  };

  useEffect(() => {
    // Check if any of the properties in isAnError is false
    const isDisabled = Object.values(isAnError).some((value) => value === true);

    // If isDisabled is true, disable the button
    // You can use setIsButtonDisabled to update the state of a button
    setIsButtonDisabled(isDisabled);
  }, [isAnError]);

  //loading formData when it's an update
  useEffect(() => {
    if (props.id !== null) {
      (async () => {
        const mission = await MissionService.loadOneMission(
          formData.user_id,
          props.id
        );

        setFormData({
          missionId: mission[0].id ? mission[0].id : "",
          nature_mission_id: mission[0].nature_mission_id,
          departure_city_id: mission[0].city_dep_name,
          arrival_city_id: mission[0].city_arr_name,
          start_date: new Date(mission[0].start_date)
            .toISOString()
            .split("T")[0],
          end_date: new Date(mission[0].end_date).toISOString().split("T")[0],
          bonus: 0,
          status_id: mission[0].status_id,
          user_id: mission[0].user_id,
          transport_id: mission[0].transport_id,
        });
      })();
    } else {
      setFormData({
        missionId: "",
        nature_mission_id: "",
        departure_city_id: "",
        arrival_city_id: "",
        start_date: "",
        end_date: "",
        bonus: 0,
        status_id: "",
        user_id: idUser,
        transport_id: "",
      });
    }
  }, [props.id, idUser]);

  const handleMission = async (e) => {
    e.preventDefault();

    //Ajout de la mission en BDD
    try {
      const response = await MissionService.addMission(formData);
      if (response === 200) {
        props.onHide(); //ferme la modal
        props.onReload(); //recharge le tableau

        //clear le form
        setFormData({
          missionId: "",
          nature_mission_id: "",
          departure_city_id: "",
          arrival_city_id: "",
          start_date: "",
          end_date: "",
          bonus: 0,
          status_id: "",
          user_id: idUser,
          transport_id: "",
        });
      } else {
        window.alert(`Error! Status code: ${response}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMission = async (e) => {
    e.preventDefault();

    //Ajout de la mission en BDD
    try {
      const response = await MissionService.updateMission(formData, props.id);
      if (response === 200) {
        props.onHide();
        props.onReload();
        //clear le form
        setFormData({
          missionId: "",
          nature_mission_id: "",
          departure_city_id: "",
          arrival_city_id: "",
          start_date: "",
          end_date: "",
          bonus: 0,
          status_id: "",
          user_id: idUser,
          transport_id: "",
        });
      } else {
        window.alert(`Error! Status code: ${response}`);
      }
    } catch (error) {
      console.log(error);
    }
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="modal-header-title"
          id="contained-modal-title-vcenter"
        >
          {props.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center d-flex flex-column">
        <MissionForm
          formData={formData}
          setFormData={setFormData}
          isAnError={isAnError}
          setIsAnError={setIsAnError}
        />
      </Modal.Body>

      <Modal.Footer>
        {props.id !== null ? (
          <Button
            className="btn-modal-success"
            onClick={handleUpdateMission}
            disabled={isButtonDisabled}
          >
            Modifier
          </Button>
        ) : (
          <Button
            className="btn-modal-success"
            onClick={handleMission}
            disabled={isButtonDisabled}
          >
            Valider
          </Button>
        )}

        <Button className="btn-modal-cancel" onClick={handleCloseModal}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
