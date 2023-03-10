import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { apiPath } from "../helper/ApiPath";
import logo from "../images/logo.png";
import poster from "../images/War of the worlds.jpg";

function Landing() {
    const [voorstelingen, setVoorstellingen] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(apiPath + "Voorstelling")
            .then((response) => response.json())
            .then((data) => {
                setVoorstellingen(data);
                console.log(data);
                setLoaded(true);
            });
    }, []);

    return (
        <Layout>
            <div className="banner">
                <img src={logo} alt="Logo theater Laak" />
                <h1>Theater Laak</h1>
            </div>
            {loaded ? (
                <div className="grid">
                    {voorstelingen.map((v) => (
                        //   <div
                        //       className="box col-4"
                        //       key={u.id}
                        //       style={{ backgroundImage: { poster } }}
                        //   >
                        //       Voorstelling: {u.naam}
                        //       <br />
                        //       Beschrijving: {u.beschrijving}
                        // </div>
                        <Link
                            to="/voorstelling"
                            state={{ voorstelling: v }}
                            className="image col-4 aspect-ration-4-3"
                            key={v.id.toString()}
                        >
                            <img
                                src={poster}
                                alt={"foto van de voorstelling: " + v.naam}
                            ></img>
                            <div className="overlay">
                                Voorstelling: {v.naam}
                                <br />
                                Beschrijving: {v.beschrijving}
                            </div>
                        </Link>
                    ))}
                    {/* <div className="image col-4 aspect-ratio-4-3">
    //                 <img src="" alt="foto theater"></img>
    //                 <div className="overlay"></div>
    //                 <h1>Plan uw Bezoek</h1>
    //                 <button>Tickets</button>
    //             </div> */}
                </div>
            ) : (
                <div>LOADING VOORSTELLINGEN</div>
            )}
        </Layout>
    );

    // return (
    //     <Layout>
    //         <div className="banner">
    //             <img src={"/images/logo.png"} alt="logo theater laak" />
    //             <h1>Theater Laak</h1>
    //         </div>

    //         <div className="grid">
    //             <div className="col-8">
    //                 <div className={"kalender-gallery image aspect-ratio-4-3"}>
    //                     <img src="voorstelling1" alt="voorstelling 1"></img>
    //                     <div className="overlay"></div>
    //                 </div>
    //             </div>

    //             <div className="flex-container-column box col-4">
    //                 <h1>Kalender</h1>
    //                 {voorstelingen.map((uitvoering) => (
    //                     <UitvoeringItem
    //                         key={uitvoering.id}
    //                         uitvoering={uitvoering}
    //                     />
    //                 ))}
    //                 <Link to={"/Kalender"}>
    //                     <button>Volledige programma</button>
    //                 </Link>
    //             </div>

    //             <div className="box col-4 aspect-ratio-4-3">
    //                 <Link to={"/nieuws"}>
    //                     <h1>Theater Laak Nieuws</h1>
    //                 </Link>
    //             </div>

    //             <div className="image col-4 aspect-ratio-4-3">
    //                 <img src="" alt="foto theater"></img>
    //                 <div className="overlay"></div>
    //                 <h1>Plan uw Bezoek</h1>
    //                 <button>Tickets</button>
    //             </div>

    //             <div className="box col-4 aspect-ratio-4-3">
    //                 <Link to={"/zaalhuren"}>
    //                     <h1>Locatie</h1>
    //                     <button>Huur een zaal</button>
    //                 </Link>
    //             </div>

    //             <div className="box col-6 aspect-ratio-4-3">
    //                 <div className="image aspect-ratio-4-2">
    //                     <img src="" alt="voorstelling 1"></img>
    //                     <div className="overlay"></div>
    //                 </div>
    //                 <h1>Info</h1>
    //                 <Link to={"/informatie"}>
    //                     <button>Over Theater Laak</button>
    //                 </Link>
    //             </div>
    //             <div className="box col-6">
    //                 <div className="image aspect-ratio-4-2">
    //                     <img src="" alt="voorstelling 1"></img>
    //                     <div className="overlay"></div>
    //                 </div>
    //                 <h1>Steun het theater</h1>
    //                 <Link to={"/doneren"}>
    //                     <button>Steun het theater</button>
    //                 </Link>
    //             </div>
    //         </div>
    //     </Layout>
    // );
}

export default Landing;
