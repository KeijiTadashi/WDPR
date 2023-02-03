// import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import { apiPath } from "../helper/ApiPath";
import { useLocation } from "react-router-dom";
import ZaalPlattegrond2 from "../components/ZaalPlattegrond2";
// belangrijk kunnen kijken welke voorstellingen er bv zaterdag zijn.

function Uitvoering2() {
    const { uitvoering } = useLocation().state;

    return (
        <Layout>
            <h1>{uitvoering.voorstelling.naam}</h1>
            <ZaalPlattegrond2
                zaal={uitvoering.zaal}
                uitvoeringId={uitvoering.id}
            />
            <h2>Uitvoering:</h2>
        </Layout>
    );
}

export default Uitvoering2;
