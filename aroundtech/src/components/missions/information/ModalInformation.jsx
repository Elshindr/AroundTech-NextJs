import React from "react";
import Modal from "react-bootstrap/Modal";

export default function ModalMission(props) {
 const date_start = new Date(props.information.start_date);
 const date_end = new Date(props.information.end_date);
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
        ></Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center d-flex flex-column">
        <p>
          Vous avez pris des{" "}
          <span>
            {props.information.label}
          </span>{" "}
          du{" "}
          <span>
            {date_start.toLocaleDateString()}
          </span>{" "}
          au{" "}
          <span>
            {date_end.toLocaleDateString()}
          </span>
          .
        </p>
      </Modal.Body>

      <Modal.Footer>
        <div className="m-2"></div>
      </Modal.Footer>
    </Modal>
  );
}
