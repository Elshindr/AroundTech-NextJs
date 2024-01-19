import './modal.css';

export default function ModalChildValidExpenseComponent(props) {


    return (
        <>
            <p className="mb-3" >Votre note de frais totale est de {props.expenseT.toFixed(2) +'€'}</p>
            <p style={{ display: props.expenseD > 0 ? 'block' : 'none' }} className="mb-3" >
                Elle contient une déduction de {props.expenseD.toFixed(2) } € sur votre prime, soit une prime finale de {(props.primeF - props.expenseD).toFixed(2) }
            </p>
        </>
    );
}


