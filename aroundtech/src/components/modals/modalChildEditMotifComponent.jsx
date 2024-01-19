import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import './modal.css';

export default function ModalChildEditMotifComponent(props) {

    const [nameValue, setNameValue] = useState(props.oldValueName || "");
    const [isCapValue, setIsCapValue] = useState(props.oldValueIsCap || false);
    const [maxCapValue, setMaxCapValue] = useState(props.oldValueMaxCap || "");

    useEffect(() => {
        (() => {

            let boolFormValid = true;

            // Check Name form
            if (nameValue.length < 3 || nameValue.length > 55 || nameValue === "") {
                boolFormValid = false;
            }

            // Check isCap and check MaxCap != 0
            if (isCapValue && (maxCapValue === "" || maxCapValue === undefined || maxCapValue <= 0)) {
                boolFormValid = false;
            }

            // Check Form is ok
            if (boolFormValid) {
                props.isBtnDisabled(false);
            } else {
                props.isBtnDisabled(true);
            }

        })()
    }, [nameValue, isCapValue, maxCapValue]);



    return (

        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    ref={props.inputNameEdit}
                    value={nameValue}
                    onChange={(e) => {
                        setNameValue(e.target.value);
                    }}
                    minLength="3"
                    maxLength="55"
                    placeholder='Ma nature de frais'
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Plafond</Form.Label>
                <Form.Check
                    type="switch"
                    ref={props.inputIsCapEdit}
                    label=""
                    checked={isCapValue}

                    onChange={(e) => {
                        setIsCapValue(e.target.checked);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" style={{ display: isCapValue ? 'block' : 'none' }}>
                <Form.Label>Montant du plafond (€)</Form.Label>
                <Form.Control
                    ref={props.inputMaxCapEdit}
                    type="text"
                    value={maxCapValue}
                    onChange={event => {

                        let newMaxCap = event.target.value.replace(/[^\d.]/g, '');

                        const indexDot = newMaxCap.indexOf('.');
                        if (indexDot !== -1) {
                            newMaxCap = newMaxCap.slice(0, indexDot + 3);
                        }

                        setMaxCapValue(newMaxCap)

                    }}
                    maxLength="25"
                    placeholder='123.34'
                />
            </Form.Group>

        </Form>
    );
}