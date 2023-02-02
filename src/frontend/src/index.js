import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Informatie from "./pages/Informatie";
import Uitvoering from "./pages/Uitvoering";
import Kalender from "./pages/Kalender";
import Account from "./pages/Account";
import "./styles.css";
import Login from "./pages/Login";
import Registreren from "./pages/Registreren";
import UitvoeringReserveren from "./pages/UitvoeringReserveren";
import Reserveren from "./pages/Reserveren";
import Medewerker from "./pages/Medewerker";
import Nieuws from "./pages/Nieuws";
import { setAuthToken } from "./helper/AuthToken";
import Voorstelling from "./pages/Voorstelling";
import ZaalHuren from "./pages/ZaalHuren";
import Doneren from "./pages/Doneren";
import Winkelmand from "./pages/Winkelmand";
import Uitvoering2 from "./pages/Uitvoering2";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
        errorElement: <Error />,
    },
    {
        path: "informatie",
        element: <Informatie />,
    },
    {
        path: "voorstelling",
        element: <Voorstelling />,
    },
    {
        path: "uitvoering",
        element: <Uitvoering />,
    },
    {
        path: "uitvoering2",
        element: <Uitvoering2 />,
    },
    {
        path: "kalender",
        element: <Kalender />,
    },
    {
        path: "account",
        element: <Account />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "registreer",
        element: <Registreren />,
    },
    {
        path: "uitvoering/:uitvoeringId/reserveren",
        element: <UitvoeringReserveren />,
    },
    {
        path: "reserveren",
        element: <Reserveren />,
    },
    {
        path: "nieuws",
        element: <Nieuws />,
    },
    {
        path: "zaalhuren",
        element: <ZaalHuren />,
    },
    {
        path: "doneren",
        element: <Doneren />,
    },
    {
        path: "medewerker",
        element: <Medewerker />,
    },
    {
        path: "winkelmand",
        element: <Winkelmand />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

const token = localStorage.getItem("token");
if (token) {
    setAuthToken(token);
}

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
