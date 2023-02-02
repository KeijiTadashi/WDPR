import axios from "axios";
import { Component, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import UitvoeringLijst from "../components/UitvoeringLijst";

export default function Voorstelling() {
    const { voorstelling } = useLocation().state;

    return (
        <>
            <Layout>
                <div className="grid">
                    <h1 className="col-12">Voorstelling</h1>
                    <div className="box col-12">
                        <h1>{voorstelling.naam}</h1>
                        <h2>Beschrijving</h2>
                        <p>{voorstelling.beschrijving}</p>
                    </div>
                    <div className="image col-8 aspect-ratio-4-3">
                        <img src="" alt="foto van voorstelling"></img>
                    </div>
                    <UitvoeringLijst voorstelling={voorstelling} />
                </div>
            </Layout>
        </>
    );
}
