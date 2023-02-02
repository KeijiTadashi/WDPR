import { getAuthTokenUser } from "../helper/AuthToken";
import React from "react";
import axios from "axios";
import { apiPath } from "../helper/ApiPath";

class TicketLijstGebruiker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            loaded: false,
        };
    }

    componentDidMount() {
        const userName = getAuthTokenUser();
        axios
            .get(apiPath + "Ticket/GetTicketsCurrentUser/" + userName)
            .then((response) => {
                console.log(response);
                this.setState({ tickets: response.data, loaded: true });
            });
    }

    render() {
        return this.state.loaded ? (
            <ul>
                {this.state.tickets.map((ticket) => (
                    <li>
                        {ticket.uitvoering.voorstelling.naam} &#40;
                        {ticket.uitvoering.beginTijd}&#41; -{" "}
                        {ticket.uitvoering.zaal.naam} rij:{" "}
                        {ticket.zitplaats.rij} kolom: {ticket.zitplaats.kolom}
                    </li>
                ))}
            </ul>
        ) : (
            <div>Loading tickets</div>
        );
    }
}

export default TicketLijstGebruiker;
