import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function ModalMission(props) {
  const newEndDate = new Date(props.information.end);
  newEndDate.setDate(newEndDate.getDate() - 1);

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
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center d-flex flex-column">
        {props.information.categorie === "leave" && (
          <p>
            Vous avez pris des{" "}
            <span style={{ color: props.information.color }}>
              {props.information.title}
            </span>{" "}
            du{" "}
            <span style={{ color: props.information.color }}>
              {props.information.start.toLocaleDateString()}
            </span>{" "}
            au{" "}
            <span style={{ color: props.information.color }}>
              {props.information.end.toLocaleDateString()}
            </span>
            .
          </p>
        )}
        {props.information.categorie === "mission" && (
          <>
            <p>
              Cette mission{" "}
              <span style={{ color: props.information.color }}>
                {props.information.title}
              </span>{" "}
              a été validée par le manager.
            </p>
            <p>
              Le déplacement est prévu du{" "}
              <span style={{ color: props.information.color }}>
                {props.information.start.toLocaleDateString()}
              </span>{" "}
              au{" "}
              <span style={{ color: props.information.color }}>
                {newEndDate.toLocaleDateString()}
              </span>
              .
            </p>
          </>
        )}
        {props.information.categorie === "holidays" && (
          <>
            <p>
              Jour férié :{" "}
              <span style={{ color: props.information.color }}>
                {props.information.title}
              </span>{" "}
              le{" "}
              <span style={{ color: props.information.color }}>
                {props.information.start.toLocaleDateString()}
              </span>
              .
            </p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer><div className="m-2"></div></Modal.Footer>
    </Modal>
  );
}
