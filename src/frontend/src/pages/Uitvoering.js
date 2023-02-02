import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiPath } from "../helper/ApiPath";
import { useLocation } from "react-router-dom";
//import ZaalPlattegrond from "../components/ZaalPlattegrond";
import { Link } from "react-router-dom";
// belangrijk kunnen kijken welke voorstellingen er bv zaterdag zijn.

function Uitvoering() {
    const { uitvoering } = useLocation().state;
    console.log(uitvoering);
    const [uitvoeringen, setUitvoeringen] = useState([]);

    useEffect(() => {
        async function getUitvoering() {
            const response = await fetch(`${apiPath}Uitvoering`);
            const data = await response.json();
            setUitvoeringen(data);
        }

        getUitvoering();
    }, []);

    const items = uitvoeringen.map((item) => (
        <li key={item.id}>
            Begin tijd: {item["beginTijd"]}, Eind tijd: {item["eindTijd"]}
        </li>
    ));
    return (
        <Layout>
            <h1>{uitvoering.voorstelling.naam}</h1>
            {/* <ZaalPlattegrond
                zaal={uitvoering.zaal}
                uitvoeringId={uitvoering.id}
            /> AAN HET MAKEN*/}
            <h2>Uitvoering:</h2>
            <ul>{items}</ul>
            <Link to={"/uitvoering/:uitvoeringId/reserveren"}>
                <button>Reserveer</button>
            </Link>
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
