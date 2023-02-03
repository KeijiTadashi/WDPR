import Layout from "../components/Layout";
import { apiPath } from "../helper/ApiPath";
import axios from "axios";
import { useRef } from "react";

function Register(userName, password) {
    const data = {
        userName: userName,
        password: password,
    };
    console.log(data);
    axios
        .post(`${apiPath}api/account/registreer_klant`, data)
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                console.log("OK");
            } else {
                console.log("Error");
            }
        });
    // fetch("https://wdprwebapi.azurewebsites.net", {
    //     method: "POST",
    //     headers: {},
    //     body: {},
    // }).then((response) => {
    //     if (response.ok) {
    //         console.log("OK");
    //     } else {
    //         console.log("Error");
    //     }
    // });
}

function Registreren() {
    const usernameRef = useRef("username");
    const passwordRef = useRef("password");

    return (
        <Layout>
            <form>
                <label>E-mail</label>
                <br />
                <input
                    type={"email"}
                    id={"username-registreer"}
                    ref={usernameRef}
                ></input>
                <br />
                <label>Wachtwoord</label>
                <br />
                <input
                    type={"password"}
                    id={"password-registreer"}
                    ref={passwordRef}
                ></input>
                <br />
                <button
                    type="button"
                    onClick={() =>
                        Register(
                            usernameRef.current.value,
                            passwordRef.current.value
                        )
                    }
                >
                    Registreer
                </button>
            </form>
        </Layout>
    );
}

export default Registreren;
