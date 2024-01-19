import React from 'react';

export default function ModalChildDeleteComponent(props) {

    return (<>

        {
            props.lstInfosToDelete.map(e => {

                return (
                    <div key={e.label} className="infos-group">
                        <p className="label-info-group">{e.label}</p>
                        <p className="data-info-group"> {e.info}</p>
                    </div>);
            })
        }
    </>);
}