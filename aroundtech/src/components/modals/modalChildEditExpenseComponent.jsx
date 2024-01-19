import Form from 'react-bootstrap/Form';
import NatureExpService from '@/services/nature_expenseService';
import { useState, useEffect } from 'react';
import Utils from '@/utils/utils';
import './modal.css';

export default function ModalChildEditExpenseComponent(props) {

    const [dateValue, setDateValue] = useState(props.dateValue || "");
    const [amountValue, setAmountValue] = useState(props.oldValueAmount || "");
    const [natValue, setNatValue] = useState(props.oldValueNat || "");

    const [lstNaturesExp, setLstNaturesExp] = useState([]);

    const [isDateValid, setIsDateValid] = useState(true);
    const [isNatValid, setIsNatValid] = useState(props.isUpdate || false);
    const [isAmountValid, setIsAmountValid] = useState(props.isUpdate || false);

    const [isErrorDateNatVisible, setIsErrorDateNatVisible] = useState(false);


    useEffect(() => {
        (async () => {
            const dataNatures = await NatureExpService.loadNaturesExp();
            setLstNaturesExp(dataNatures);
        })()
    }, []);


    const onChangeInForm = (val, inputType) => {

        setIsErrorDateNatVisible(false);

        let boolDate = isDateValid;
        let boolNat = isNatValid;
        let boolAmt = isAmountValid;
        let boolDateNat = true;

        let valDate = "";
        let valNat = "";


        if (inputType === "date" && props.minDate <= val && val <= props.maxDate) {

            boolDate = true;
            setIsDateValid(true);

            valDate = val;
            valNat = props.inputNatExpEdit.current.value;

        } else if (inputType === "date") {

            boolDate = false;
            setIsDateValid(false);
            valDate = val;
            valNat = props.inputNatExpEdit.current.value;
        }

        if (inputType === "amount" && val > 0) {

            boolAmt = true;
            setIsAmountValid(true);

            valDate = dateValue;
            valNat = props.inputNatExpEdit.current.value;

        } else if (inputType === "amount") {

            boolAmt = false;
            setIsAmountValid(false);

            valDate = dateValue;
            valNat = props.inputNatExpEdit.current.value;
        }

        if (natValue !== "" || (inputType === "nature" && val !== "")) {

            boolNat = true;
            setIsNatValid(true);
            valDate = dateValue;
            valNat = val;

        } else if (inputType === "nature") {

            boolNat = false;
            setIsNatValid(false);
            valDate = dateValue;
            valNat = val;
        }


        // Check couple Date/Nat is ok
        if (boolDate && boolNat && props.lstExpenses !== undefined) {

            let lstExpDateNat = props.lstExpenses.filter(exp => exp.nat_exp_name === valNat).find(exp => Utils.formatDateToISO(exp.created_at) === valDate);
            if (lstExpDateNat !== undefined) {
                boolDateNat = false;
                setIsErrorDateNatVisible(true);
            }
        }



        // Check Form is ok
        if (boolDate && boolNat && boolAmt && boolDateNat) {
            props.isBtnDisabled(false);

        } else {
            props.isBtnDisabled(true);
        }
    }


    return (

        <Form>

            <Form.Group className="mb-3" controlId="formExpenseDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    ref={props.inputDateEdit}
                    value={dateValue}
                    onChange={(e) => {
                        setDateValue(e.target.value);
                        onChangeInForm(e.target.value, "date");
                    }}
                    min={props.minDate}
                    max={props.maxDate}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formExpenseNatureExp">
                <Form.Label>Nature</Form.Label>
                <Form.Select
                
                    ref={props.inputNatExpEdit}
                    value={natValue === undefined ? "" : natValue}
                    onChange={(e) => {
                        setNatValue(e.target.value);
                        onChangeInForm(e.target.value, "nature");
                    }}
                >

                    <option value="">Sélectionner la nature de la dépense</option>

                    {lstNaturesExp.map((nat) => {
                        return (<option id ={nat.id} key={nat.id} >{nat.name}</option>);
                    })}

                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddExpenseAmount">
                <Form.Label>Montant</Form.Label>
                <Form.Control
                    ref={props.inputAmountEdit}
                    type="text" 
                    value={amountValue}
                    onChange={event => {
                        let newAmount = event.target.value.replace(/[^\d.]/g, '');


                            const indexDot = newAmount.indexOf('.');
                            if (indexDot !== -1) {
                                newAmount = newAmount.slice(0, indexDot + 3);
                            }
                                                
                            setAmountValue(newAmount)
                            onChangeInForm(newAmount, "amount");

                    }}
                    placeholder='123.34'
                />
            </Form.Group>
            <p style={{ display: isErrorDateNatVisible ? 'block' : 'none' }} className="mb-3 errorLabel" id="errorDateNatLabel">Ce couple date - nature existe déjà pour cette mission</p>
        </Form>
    );
}