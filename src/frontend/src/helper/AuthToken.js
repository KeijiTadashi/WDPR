import axios from "axios";
import jwt_decode from "jwt-decode";

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        window.location.reload(false);
    }
};

/**
 * Check if the token is still valid and returns it with the loggedin username (email), will also remove the token if no longer valid
 * @returns returns username OR returns false if invalid or not set
 */
export const getAuthTokenUser = () => {
    const token = localStorage.getItem("token");

    if (token === null) return false;

    const decodedToken = jwt_decode(token);
    const name = decodedToken.name;
    const exp = decodedToken.exp * 1000; //token.exp is in seconds from epoch, Date.now() is in milliseconds

    if (exp < Date.now()) {
        console.log("Expired - exp: " + exp + " now: " + Date.now());
        setAuthToken();
        return false;
    }

    return name;
};
