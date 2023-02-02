// import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiPath } from "../helper/ApiPath";
import { useLocation } from "react-router-dom";
//import ZaalPlattegrond from "../components/ZaalPlattegrond";
// belangrijk kunnen kijken welke voorstellingen er bv zaterdag zijn.

function Uitvoering() {
    const { uitvoering } = useLocation().state;
    console.log(uitvoering);
    // const [uitvoeringen, setUitvoeringen] = useState([]);

    // useEffect(() => {
    //     async function getUitvoering() {
    //         const response = await fetch(
    //             apiPath + "Uitvoering/" + uitvoering.id
    //         );
    //         const data = await response.json();
    //         setUitvoeringen(data);
    //     }

    //     getUitvoering();
    // }, []);

    async function koopTicket() {
        const response = await fetch("https://fakepay.azurewebsites.net/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                amount: 10,
                reference: 1,
                url: apiPath + "Ticket/BuyTicket",
            }),
        });

        if (response.ok) {
            const html = await response.text();
            const popup = window.open();
            popup.document.write(html);
        }
    }

    return (
        <Layout>
            <h1>{uitvoering.voorstelling.naam}</h1>
            <h2>Uitvoering:</h2>
            <h2>Uitvoeringen:</h2>
            <button onClick={koopTicket}>Koop ticket</button>
        </Layout>
    );
    // const [uitvoeringen, setUitvoeringen] = useState([]);
    // useEffect(() => {
    //     async function getUitvoering() {
    //         const response = await fetch(`${apiPath}Uitvoering`);
    //         const data = await response.json();
    //         setUitvoeringen(data);
    //     }
    //     getUitvoering();
    // }, []);
    // const items = uitvoeringen.map((item) => (
    //     <li key={item.id}>
    //         Begin tijd: {item["beginTijd"]}, Eind tijd: {item["eindTijd"]}
    //     </li>
    // ));
    // return (
    //     <Layout>
    //         <h2>Uitvoeringen:</h2>
    //         <ul>{items}</ul>
    //     </Layout>
    // );
}

export default Uitvoering;
