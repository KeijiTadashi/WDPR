// import Zitplaats from "./Zitplaats";
import React from "react";
import axios from "axios";
// import { useEffect, useState } from "react";
import { apiPath } from "../helper/ApiPath";
import Zitplaats2 from "./Zitplaats2";
import { Link } from "react-router-dom";
// import linq from "linq";

export default class ZaalPlattegrond2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zaal: props.zaal,
            uitvoeringId: props.uitvoering.id,
            uitvoering: props.uitvoering,
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
                            ticketKey={[
                                this.state.uitvoeringId,
                                rij,
                                kolom,
                                rang,
                            ]}
                        />
                    );
                } else {
                    rijZitplaatsComponenten.push(
                        <Zitplaats2
                            beschikbaar={true}
                            rang={rang}
                            key={`r${rij}k${kolom}`}
                            ticketKey={[
                                this.state.uitvoeringId,
                                rij,
                                kolom,
                                rang,
                            ]}
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
    }

    render() {
        return (
            <>
                <div className="grid">
                    <div className="col-12"></div>
                    {this.state.loaded ? (
                        <>
                            <div className="col-4 center-text">
                                {this.props.zaal.naam}
                                {this.state.zitplaatsComponenten.map(
                                    (rijen, index) => (
                                        <div
                                            className="zaal-row"
                                            key={index + 1}
                                        >
                                            <div className="rij-info">
                                                Rij {index + 1}
                                            </div>
                                            {rijen}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="col-8">
                                Legenda:
                                <ul>
                                    <li>
                                        Prijs 1e rang: &euro;
                                        {
                                            this.state.uitvoering.voorstelling
                                                .prijs1
                                        }
                                    </li>
                                    <li>
                                        Prijs 2e rang: &euro;
                                        {
                                            this.state.uitvoering.voorstelling
                                                .prijs2
                                        }
                                    </li>
                                    <li>
                                        Prijs 3e rang: &euro;
                                        {
                                            this.state.uitvoering.voorstelling
                                                .prijs3
                                        }
                                    </li>
                                    <li>
                                        Prijs 4e rang: &euro;
                                        {
                                            this.state.uitvoering.voorstelling
                                                .prijs4
                                        }
                                    </li>
                                </ul>
                                <Link to={"../Winkelmand"}>
                                    <button>Koop tickets</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div>LOADING ZAAL</div>
                    )}
                </div>
            </>
        );
    }
}
