import Layout from "../components/Layout";
import "../css/medewerker.css";
import { useState, useRef } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import { apiPath } from "../helper/ApiPath";

function Medewerker() {
    const [functie, setFunctie] = useState("Functie");

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const selectFunctie = (e) => {
        console.log("SELECT FUNCTIE: " + JSON.stringify(e));
        setFunctie(e.value);
    };

    // const functies = ["Admin", "Directie", "Medewerker"];
    const functies = ["Directie", "Medewerker"];
    const defaultOption = functies[0];

    return (
        <Layout>
            {/* #40 = ( #41 = ) */}
            <label>
                Voeg nieuw medewerker account toe &#40;alleen admin of
                directie&#41;
            </label>
            <br />
            <input type={"text"} id={"username"} ref={usernameRef}></input>
            <br />
            <label>Wachtwoord</label>
            <br />
            <input type={"password"} id={"password"} ref={passwordRef}></input>
            <br />
            <label>Functie</label>
            <Dropdown
                className="functie-dropdown"
                options={functies}
                onChange={selectFunctie}
                placeholder="Selecteer functie"
                arrowClosed={<div className="arrow-dropdown">&#60;</div>}
                arrowOpen={<div className="arrow-dropdown">🢓</div>}
            />
            <br />
            <button
                type="button"
                onClick={() =>
                    RegistreerMedewerker(
                        usernameRef.current.value,
                        passwordRef.current.value,
                        functie
                    )
                }
            >
                Registreer medewerker
            </button>
        </Layout>
    );
}

export default Medewerker;

function RegistreerMedewerker(username, password, functie) {
    const medewerkerInfo = {
        UserName: username,
        password: password,
        functie: functie,
    };
    axios
        .post(apiPath + "api/Account/Registreer_" + functie, medewerkerInfo)
        .then((response) => {
            console.log(response);
            //Show succesfull create page or something
        })
        .catch((err) => console.log(err.toJSON()));
}
