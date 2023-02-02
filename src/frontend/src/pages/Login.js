import Layout from "../components/Layout";
import axios from "axios";
import { setAuthToken } from "../helper/AuthToken";
import { useRef } from "react";
import { apiPath } from "../helper/ApiPath";

function LoginJWT(username, password) {
    const loginInfo = {
        UserName: username,
        password: password,
    };
    axios
        .post(apiPath + "Api/Account/login", loginInfo)
        .then((response) => {
            console.log(response);
            const token = response.data.api_key;
            setAuthToken(token);

            //Show succesfull login page or something, for now reload the page to change the header and stuff
            // redirect("/Account");
            window.location.reload(false);
        })
        .catch((err) => console.log(err.toJSON()));
}

function Login() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <Layout>
            <form>
                <label>Gebruikersnaam</label>
                <br />
                <input type={"email"} id={"username"} ref={usernameRef}></input>
                <br />
                <label>Wachtwoord</label>
                <br />
                <input
                    type={"password"}
                    id={"password"}
                    ref={passwordRef}
                ></input>
                <br />
                <button
                    type="button"
                    onClick={() =>
                        LoginJWT(
                            usernameRef.current.value,
                            passwordRef.current.value
                        )
                    }
                >
                    Log in
                </button>
            </form>
        </Layout>
    );
}

export default Login;
