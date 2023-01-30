import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getAuthTokenUser, setAuthToken } from "../helper/AuthToken";

export default function Header() {
    const isLoggedInName = getAuthTokenUser(); //is either false or the username
    return (
        <header>
            <div className="flex-container-row">
                <Link className={"link"} to={"/"}>
                    <h1 style={{ lineHeight: "0" }}>Theater Laak</h1>
                </Link>
                <Link className={"link"} to={"/informatie"}>
                    Informatie
                </Link>
                <Link className={"link"} to={"/kalender"}>
                    Kalender
                </Link>
                {isLoggedInName ? loggedIn(isLoggedInName) : notLoggedIn()}
            </div>
        </header>
    );
}

function loggedIn(userName) {
    return (
        <Fragment>
            <div className="flex-container-column">
                <Link className="link" to={"/account"}>
                    {userName}
                </Link>
                <Link
                    // className={"logout-button"}
                    className="link"
                    onClick={() => setAuthToken()}
                >
                    Log out
                </Link>
            </div>
        </Fragment>
    );
}

function notLoggedIn() {
    return (
        <Fragment>
            <Link className={"link"} to={"/login"}>
                Log in
            </Link>
            <Link className={"link"} to={"/registreer"}>
                Registreer
            </Link>
        </Fragment>
    );
}
