import * as React from 'react';

import { Html, Row, Column, Section, Hr, Text, Heading, Img } from '@react-email/components';
import Utils from '@/utils/utils';

export function Email(props) {

    const header = {
        display: 'flex',
        flex: 'row',
        justifyContent: 'start',

        color: '#5649A6',
        fontWeight: 800,

    }

    const rowCont = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start'
    }

    const colCont = {
        width: '10em',
        justifyContent: 'center'
    }

    const logo = {
        display: 'block',
        margin: '40px 0 0 0',
        textAlign: 'center'
    }

    return (
        <Html lang="fr">

            <Section>
                <Heading as="h1"> Il y a {props.lstMissionsEnd.length} missions en attentes de validation.</Heading>
                <Hr />
            </Section>

            <Section>
                <Text valign="top" style={{ padding: "16px 32px 32px 32px", fontFamily: "Open Sans, sans-serif", textAlign: "left", lineHeight: "2", fontSize: "14px", margin: "0", color: "#3d3d3d", wordBreak: "normal" }}>
                    Bonjour,<br />
                    <br />Les missions suivantes requirent votre attention:
                </Text>

                <Row style={header}>
                    <Column style={colCont}>
                        Debut
                    </Column>
                    <Column style={colCont}>
                        Fin
                    </Column>
                    <Column style={colCont}>
                        Nature
                    </Column>
                    <Column style={colCont}>
                        Transport
                    </Column>
                    <Column style={colCont}>
                        Départ
                    </Column>
                    <Column style={colCont}>
                        Arrivée
                    </Column>
                </Row>


                {props.lstMissionsEnd.map(mis => {

                    return (
                        <Row key={mis.id} style={rowCont}>
                            <Column style={colCont}>
                                {Utils.formatDateTimestampToStr(mis.start_date)}
                            </Column>
                            <Column style={colCont}>
                                {Utils.formatDateTimestampToStr(mis.end_date)}
                            </Column>
                            <Column style={colCont}>
                                {mis.nat_name}
                            </Column>
                            <Column style={colCont}>
                                {mis.trans_name}
                            </Column>
                            <Column style={colCont}>
                                {mis.city_dep}
                            </Column>
                            <Column style={colCont}>
                                {mis.city_arr}
                            </Column>
                        </Row>
                    );
                })}

            </Section>

            <Section style={logo}>
                <Hr />
                <Img src={`https://api.smtprelay.co/userfile/99fc7dc0-d771-484a-9c7e-ff5e7cfe09f5/n_cyber-monday-separator.png`} width="392" height="" alt="" style="{{borderRadius:'0px',display:'block',height:'auto',width:'100%',maxWidth:'100%',border:'0'}}" className="g-img" />
                <Text style="{{fontFamily:'Open Sans, sans-serif',text-align:'center',lineHeight:'1.15',fontSize:'11px',margin:'0',color:'#3d3d3d',wordBreak:'normal'"> Ce mail est automatique, merci de ne pas y répondre.</Text>
            </Section>
            
        </Html >
    );
}
