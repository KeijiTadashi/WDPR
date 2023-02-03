import React from "react";

export default class Zitplaats2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rang: props.rang,
            geselecteerd: false,
            beschikbaar: props.beschikbaar,
            color: "white",
            ticketKey: props.ticketKey,
        };
        this.clicked = this.clicked.bind(this);

        var mandje = sessionStorage.getItem("mandje");
        if (mandje !== null) {
            mandje = JSON.parse(mandje);
            if (mandje.includes(this.state.ticketKey))
                this.state.geselecteerd = true;
        }
    }

    clicked() {
        if (this.state.beschikbaar) {
            var mandje = sessionStorage.getItem("mandje");
            if (mandje === null) {
                mandje = [];
            } else {
                mandje = JSON.parse(mandje);
            }
            if (this.state.geselecteerd) {
                mandje.splice(mandje.indexOf(this.state.ticketKey), 1);
            } else {
                mandje.push(this.state.ticketKey);
            }
            sessionStorage.setItem("mandje", JSON.stringify(mandje));
            this.setState({ geselecteerd: !this.state.geselecteerd });
        }
    }

    render() {
        var color = this.state.beschikbaar
            ? this.state.geselecteerd
                ? "blue"
                : "white"
            : "red";
        var rang = this.state.rang;
        return rang === 0 ? (
            <div className={"zitplaats invisible"}></div>
        ) : (
            <div
                className={"zitplaats"}
                style={{ background: color }}
                onClick={this.clicked}
            >
                {rang}
            </div>
        );
    }
}
