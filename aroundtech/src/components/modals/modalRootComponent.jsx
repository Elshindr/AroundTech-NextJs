import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function ModalRootComponent(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title className="modal-header-title" id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.childmodal}
            </Modal.Body>
            
            <Modal.Footer>
                {props.footerbuttons}
            </Modal.Footer>
        </Modal>
    );
}