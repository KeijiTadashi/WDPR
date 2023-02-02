import React from "react";
import axios from "axios";
import { apiPath } from "../helper/ApiPath";
import { formatDate, formatTime } from "../helper/FormatDateTime";
import { Link } from "react-router-dom";

export default class UitvoeringLijst extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voorstelling: props.voorstelling,
            uitvoeringen: [],
            loaded: false,
        };
    }

    componentDidMount() {
        axios
            .get(
                apiPath +
                    "Uitvoering/GetUitvoeringenVoorstelling/" +
                    this.state.voorstelling.id
            )
            .then((response) => {
                this.setState({ uitvoeringen: response.data, loaded: true });
            });
    }

    render() {
        return this.state.loaded ? (
            <div className="box col-4">
                <h2>datums</h2>
                {this.state.uitvoeringen.map((u) => (
                    <Link
                        to={"/uitvoering"}
                        state={{ id: u.id }}
                        key={u.id.toString()}
                    >
                        <button className="button-uitvoering-datum">
                            {formatDate(u.beginTijd)}
                            <br />
                            &#40;
                            {formatTime(u.beginTijd)}&#41;
                        </button>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="box col-4">LOADING</div>
        );
    }
}
