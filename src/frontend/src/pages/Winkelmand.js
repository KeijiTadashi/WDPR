import { useState } from "react";
import Layout from "../components/Layout";
import { apiPath } from "../helper/ApiPath";
import axios from "axios";
import React from "react";

class GetWinkelMandItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            mandje: [],
            strMandje: props.strMandje,
            listItems: [],
            totaalPrijs: 0,
        };
        this.KoopTickets = this.KoopTickets.bind(this);
        let tempStrMandje = this.state.strMandje;
        let tempMandje = [];
        tempStrMandje = tempStrMandje.substring(1, tempStrMandje.length);
        console.log(tempStrMandje);
        while (tempStrMandje.length > 0) {
            let uitvoeringId = tempStrMandje.substring(
                1,
                tempStrMandje.indexOf(",")
            );
            tempStrMandje = tempStrMandje.substring(uitvoeringId.length + 2);
            let rij = tempStrMandje.substring(0, tempStrMandje.indexOf(","));
            tempStrMandje = tempStrMandje.substring(rij.length + 1);
            let kolom = tempStrMandje.substring(0, tempStrMandje.indexOf(","));
            tempStrMandje = tempStrMandje.substring(kolom.length + 1);
            let rang = tempStrMandje.substring(0, tempStrMandje.indexOf("]"));
            tempStrMandje = tempStrMandje.substring(kolom.length + 2);
            tempMandje.push({
                uitvoeringId: uitvoeringId,
                rij: rij,
                kolom: kolom,
                rang: rang,
            });
            console.log(uitvoeringId);
            console.log(tempStrMandje);
        }
        this.state.mandje = tempMandje;
    }

    async componentDidMount() {
        var arr = [];
        var totPrijs = 0;
        Promise.all(
            this.state.mandje.map(async (i, index) => {
                try {
                    await axios
                        .get(`${apiPath}uitvoering/${i.uitvoeringId}`)
                        .then((response) => {
                            var uitvoering = response.data;
                            let prijs = 0;
                            switch (i.rang) {
                                case "1":
                                    prijs = uitvoering.voorstelling.prijs1;
                                    break;
                                case "2":
                                    prijs = uitvoering.voorstelling.prijs2;
                                    break;
                                case "3":
                                    prijs = uitvoering.voorstelling.prijs3;
                                    break;
                                case "4":
                                    prijs = uitvoering.voorstelling.prijs4;
                                    break;

                                default:
                                    break;
                            }
                            totPrijs += prijs;
                            arr.push(
                                <li key={index}>
                                    &euro;{prijs} {uitvoering.voorstelling.naam}{" "}
                                    &#40;
                                    {i.rij}, {i.kolom}&#41;
                                </li>
                            );
                        });
                } catch {}
            })
        ).then(() => {
            this.setState({
                listItems: arr,
                totaalPrijs: totPrijs,
                loaded: true,
            });
            console.log(this.state.listItems);
        });
    }

    async KoopTickets() {
        const response = await fetch("https://fakepay.azurewebsites.net/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                amount: this.state.totaalPrijs,
                reference: 1,
                url: "account",
            }),
        });

        if (response.ok) {
            const html = await response.text();
            const popup = window.open();
            popup.document.write(html);
        }
    }
    // console.log(strMandje);
    // while (strMandje.length > 0) {}
    // const [loaded, setLoaded] = useState(false);
    // axios.get(`${apiPath}Uitvoering/${mandje[0]}`).then((response) => {
    //     setLoaded(true);
    // });
    render() {
        return this.state.loaded ? (
            <>
                <ul>{this.state.listItems.map((i) => i)}</ul>
                <div>Totaal prijs{this.state.totaalPrijs}</div>
                <button onClick={this.KoopTickets}>Betaal</button>
            </>
        ) : (
            <div>Berekenen totaal prijs</div>
        );
    }
}

function Winkelmand() {
    var mandje = sessionStorage.getItem("mandje");
    console.log(mandje);
    return (
        <Layout>
            <div className="grid">
                <div className="col-12 box">
                    {mandje === null ? (
                        "Winkelmandje is leeg"
                    ) : (
                        <GetWinkelMandItems strMandje={mandje} />
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Winkelmand;
