import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import NatureMission from '@/services/nature_missionService';
import Utils from '@/utils/utils';

export default function ModalChildEditNatureComponent(props){

    const [lstNatureMission, setNatureMission] = useState([]);
    const [nameValue, setNameValue] = useState(props.oldInputName);
    const [isChargeValue, setIsChargeValue] = useState(props.oldInputIsCharge.toString());
    const [isBonusValue, setIsBonusValue] = useState(props.oldInputIsBonus.toString());
    const [tjmValue, setTjmValue] = useState(props.oldInputTjm);
    const [percentageValue, setPercentageValue] = useState(props.oldInputPercentage);
    const dateDuJour = new Date().toISOString().split("T")[0];
    const [dateDebut, setDateDebut] = useState(dateDuJour);
    const [endDateValue, setEndDateValue] = useState(props.oldInputEndDate);
    
    useEffect(() => {
        (async () => {
            const dataNatureMis = await NatureMission.loadNaturesMis();
            setNatureMission(dataNatureMis);
            // const values = dataNatureMis.map(nature => nature.is_bonus);
            // console.log(values);
            // const values1 = dataNatureMis.map(nature => nature.is_charge);
            // console.log(values1);
        })()
    }, []);

    const handleChargeChange = (event) => {
        setIsChargeValue(event.target.value);
    };
    
    const handleBonusChange = (event) => {
        setIsBonusValue(event.target.value);
    };
    
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nature</Form.Label>
                    <Form.Control type="text" ref={props.inputNameEdit} value={nameValue} onChange={(e) => {
                        setNameValue(e.target.value);
                    }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="facturee">
                    <Form.Label>Facturée</Form.Label>
                    <div className="mb-3">
                        <Form.Check inline type="radio" label="Non" name="is_chargeEdit" value="0" ref={props.inputIsChargeEdit} checked={isChargeValue === "0"} onChange={handleChargeChange} />
                        <Form.Check inline type="radio" label="Oui" name="is_chargeEdit" value="1" ref={props.inputIsChargeEdit} checked={isChargeValue === "1"} onChange={handleChargeChange} />
                    </div>    
                </Form.Group>
                <Form.Group className="mb-3" controlId="prime">
                    <Form.Label>Versement prime</Form.Label>
                    <div className="mb-3">
                    {/* verifie si facturée est à non alors versement prime et TJM sont masqués */}
                        <Form.Check inline type="radio" label="Non" name="is_bonusEdit" value="0" ref={props.inputIsBonusEdit} checked={isBonusValue === "0"} onChange={handleBonusChange} disabled={isChargeValue === "0"} />
                        <Form.Check inline type="radio" label="Oui" name="is_bonusEdit" value="1" ref={props.inputIsBonusEdit} checked={isBonusValue === "1"} onChange={handleBonusChange} disabled={isChargeValue === "0"} />
                    </div>   
                </Form.Group>
                <Form.Group className="mb-3" controlId="tjm">
                    <Form.Label>Tarif journalier moyen (€)</Form.Label>
                    <Form.Control type="text" ref={props.inputTJMEdit} value={tjmValue} onChange={(e) => { setTjmValue(e.target.value); } } disabled={isChargeValue === "0"} />
                </Form.Group>
                {/* si versement de prime est égal à non alors le champs % prime est masqué */}
                {isBonusValue === "1" && 
                    <Form.Group className="mb-3" controlId="%Prime">
                        <Form.Label>% Prime</Form.Label>
                        <Form.Control type="text" ref={props.inputPercentageEdit} value={Utils.formatAmount(percentageValue)} onChange={(e) => { setPercentageValue(e.target.value); } } disabled={isChargeValue === "0"} />
                    </Form.Group>
                }
                <Form.Group className="mb-3" controlId="start_date">
                    <Form.Label>Date de début</Form.Label>
                    <Form.Control type="date" ref={props.inputStartDate} value={dateDebut} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="end_date">
                    <Form.Label>Date de fin</Form.Label>
                    <Form.Control type="date" ref={props.inputEndDate} value={endDateValue ? Utils.formatDateToISO(endDateValue) : null} onChange={(e) => { setEndDateValue(e.target.value); }} placeholder='jj/mm/yyyy'/>
                </Form.Group>
            </Form>
        </>
    );
}
