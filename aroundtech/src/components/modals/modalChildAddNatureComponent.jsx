import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import NatureMisService from '@/services/nature_missionService';


export default function modalChildAddNatureComponent(props){

    const [lstNatureMission, setNatureMission] = useState([]);
    const [isCharge, setIsCharge] = useState('0'); // Par défaut, "Non" est sélectionné
    const [isTJMVisible, setIsTJMVisible] = useState(false);
    const [isPercentageVisible, setIsPercentageVisible] = useState(false);

    const dateDuJour = new Date().toISOString().split("T")[0];
    // console.log('date ', dateDuJour)
    const [dateDebut, setDateDebut] = useState(dateDuJour);

    useEffect(() => {
        (async () => {
            const dataNature = await NatureMisService.loadNaturesMis();
            setNatureMission(dataNature);
        })()
        // désactive le tjm et le % prime à l'ouverture de la modal
        setIsTJMVisible(false);
        setIsPercentageVisible(false);
    }, []);

    const handleChargeChange = (e) => {
        const chargeValue = e.target.value;
        setIsCharge(chargeValue);
        
        if(chargeValue === "1"){
            // si facturée = oui on active le tjm 
            setIsTJMVisible(true);            
        }else{
            // sinon reste désactivé
            setIsTJMVisible(false);
        }
    }
    const handleBonusChange = (e) => {
        const bonusValue = e.target.value;
        setIsCharge(bonusValue);

        if(bonusValue === "1"){
            // si versement prime = oui on active le %prime
            setIsPercentageVisible(true);
        }else{
            // sinon reste désactivé
            setIsPercentageVisible(false);
        }
    }
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nature</Form.Label>
                    <Form.Control type="text" autoFocus ref={props.inputName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="facturee">
                    <Form.Label>Facturée</Form.Label>
                    <div className="mb-3">
                        <Form.Check inline type="radio" label="Non" name="is_charge" value="0" ref={props.inputIsCharge} onChange={handleChargeChange} />
                        <Form.Check inline type="radio" label="Oui" name="is_charge" value="1" ref={props.inputIsCharge} onChange={handleChargeChange} />
                    </div>    
                </Form.Group>
                <Form.Group className="mb-3" controlId="prime">
                    <Form.Label>Versement prime</Form.Label>
                    <div className="mb-3">
                        <Form.Check inline type="radio" label="Non" name="is_bonus" value="0" ref={props.inputIsBonus} onChange={handleBonusChange} disabled={isCharge === "0"}/>
                        <Form.Check inline type="radio" label="Oui" name="is_bonus" value="1" ref={props.inputIsBonus} onChange={handleBonusChange} disabled={isCharge === "0"}/>
                    </div>   
                </Form.Group>
                {isTJMVisible && 
                    <Form.Group className="mb-3" controlId="tjm">
                        <Form.Label>Tarif journalier moyen</Form.Label>
                        <Form.Control type="text" ref={props.inputTJM} />
                    </Form.Group>
                }
                {isPercentageVisible &&
                    <Form.Group className="mb-3" controlId="%Prime">
                        <Form.Label>% Prime</Form.Label>
                        <Form.Control type="text" ref={props.inputPercentage} />
                    </Form.Group>
                }
                <Form.Group className="mb-3" controlId="dateDebut">
                    <Form.Label>Date de début</Form.Label>
                    <Form.Control type="date" ref={props.inputStartDate} value={dateDebut} disabled/>
                </Form.Group>
            </Form>
        </>
    );
}

