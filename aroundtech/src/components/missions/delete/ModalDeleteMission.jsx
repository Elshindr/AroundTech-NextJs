import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import MissionService from "@/services/missionService";

export default function ModalDeleteMission({...props}) {
  const handleCloseModal = () => {
    props.onHide();
  };

  const handleDeleteMission = async () => {
    const response = await MissionService.deleteMission(props.id);
    props.onHide();
    if (response === true) {
      props.onReload();
    } else {
      window.alert("Une erreur est survenue. Suppression impossible !");
    }
  };

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
          style={{ color: "red" }}
        >
          {props.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center d-flex flex-column">
        <span className="h5 pb-4">
          Etes-vous sûr de vouloir supprimer cette mission?
        </span>
      </Modal.Body>

      <Modal.Footer>
        <Button className="btn-modal-success" onClick={handleDeleteMission}>
          Valider
        </Button>
        <Button className="btn-modal-cancel" onClick={handleCloseModal}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
