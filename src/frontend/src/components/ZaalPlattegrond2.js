// import Zitplaats from "./Zitplaats";
import React from "react";
import axios from "axios";
// import { useEffect, useState } from "react";
import { apiPath } from "../helper/ApiPath";
import Zitplaats2 from "./Zitplaats2";
// import linq from "linq";

export default class ZaalPlattegrond2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zaal: props.zaal,
            uitvoeringId: props.uitvoeringId,
            zitplaatsen: [],
            zitplaatsComponenten: [],
            tickets: [],
            xMax: props.zaal.kolommen,
            yMax: props.zaal.rijen,
            loaded: false,
        };
    }

    async componentDidMount() {
        var ticketsResponse = [];
        var zitplaatsenRespone;
        await axios
            .get(apiPath + "Ticket/" + this.state.uitvoeringId)
            .then((response) => {
                ticketsResponse = response.data;
            });
        await axios
            .get(`${apiPath}Zaal/${this.state.zaal.zaalId}/zitplaatsen`)
            .then((response) => {
                zitplaatsenRespone = response.data;
            });

        var rijZitplaatsComponenten = [];
        var listZitplaatsComponenten = [];
        for (let rij = 1; rij <= this.state.yMax; rij++) {
            for (let kolom = 1; kolom <= this.state.xMax; kolom++) {
                let rang = zitplaatsenRespone.find(
                    (z) => z.rij === rij && z.kolom === kolom
                ).rang;
                if (
                    ticketsResponse.find(
                        (t) =>
                            t.zitplaats.rij === rij &&
                            t.zitplaats.kolom === kolom
                    ) !== undefined
                    // linq
                    //     .from(ticketsResponse)
                    //     .where(
                    //         (t) =>
                    //             t.zitplaats.rij === rij &&
                    //             t.zitplaats.kolom === kolom
                    //     ).length > 0
                ) {
                    console.log("FALSE");
                    rijZitplaatsComponenten.push(
                        <Zitplaats2
                            beschikbaar={false}
                            rang={rang}
                            key={`r${rij}k${kolom}`}
                        />
                    );
                } else {
                    rijZitplaatsComponenten.push(
                        <Zitplaats2
                            beschikbaar={true}
                            rang={rang}
                            key={`r${rij}k${kolom}`}
                        />
                    );
                }
            }
            listZitplaatsComponenten.push(rijZitplaatsComponenten);
            rijZitplaatsComponenten = [];
        }
        this.setState({
            tickets: ticketsResponse,
            zitplaatsen: zitplaatsenRespone,
            zitplaatsComponenten: listZitplaatsComponenten,
            loaded: true,
        });
        console.log("END OF MOUNTED");
        console.log(this.state);
    }

    render() {
        console.log("RENDER");
        console.log(this.state);
        return (
            <>
                <div>INFO: Zaal: {this.props.zaal.naam}</div>
                {this.state.loaded ? (
                    <div className="box">
                        {this.state.zitplaatsComponenten.map((rijen) => (
                            <div className="zaal-row">{rijen}</div>
                        ))}
                    </div>
                ) : (
                    <div>LOADING TICKETS</div>
                )}
            </>
        );
    }
}
