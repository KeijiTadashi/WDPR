import React from "react";

export default class Zitplaats2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rang: props.rang,
            geselecteerd: false,
            beschikbaar: props.beschikbaar,
            color: "white",
        };
    }

    render() {
        var color = this.state.beschikbaar ? "white" : "red";
        var rang = this.state.rang;
        return rang === 0 ? (
            <div className={"zitplaats invisible"}></div>
        ) : (
            <div className={"zitplaats"} style={{ background: color }}>
                {rang}
            </div>
        );
    }
}
