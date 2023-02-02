import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// belangrijk kunnen kijken welke voorstellingen er bv zaterdag zijn.

function Uitvoering() {
    const {id} = useLocation().state;
    const [uitvoering, setUitvoering] = useState([]);

    useEffect(() => {
        async function getUitvoering() {
            const response = await fetch(apiPath + "Uitvoering/" + id);
            const data = await response.json();
            setUitvoering(data);
        }

        getUitvoering();
    }, []);

    async function koopTicket() {
        const response = await fetch("https://fakepay.azurewebsites.net/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'amount': 10,
                'reference': 1,
                'url': apiPath + "Ticket/BuyTicket"
            })
        });

        if (response.ok) {
            const html = await response.text();
            const popup = window.open();
            popup.document.write(html);
        }
    }

    return (
        <Layout>
            <h2>Uitvoeringen:</h2>
            <ul>{items}</ul>
        </Layout>
    );
}

export default Uitvoering;
