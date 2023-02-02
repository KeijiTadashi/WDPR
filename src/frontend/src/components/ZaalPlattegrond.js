import Zitplaats from "./Zitplaats";
import React from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import { apiPath } from "../helper/ApiPath";

//export default class ZaalPlattegrond extends React.Component { Tijdelijk, want ik was hier ook aan aan het werken
// class ZaalPlattegrond2 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             zaal: props.zaal,
//             uitvoeringId: props.uitvoeringId,
//             zitplaatsen: [],
//             zitplaatsComponenten: [],
//             tickets: [],
//             xMax: props.zaal.kolommen,
//             yMax: props.zaal.rijen,
//             loaded: false,
//         };
//     }

//     componentDidMount() {
//         axios
//             .get(apiPath + "Ticket/" + this.state.uitvoeringId)
//             .then((response) => {
//                 this.setState({ tickets: response.data, loaded: true });
//             });
//     }
//     render() {
//         return (
//             <>
//                 <div>INFO: Zaal: {this.props.zaal.naam}</div>
//                 {this.state.loaded ? (
//                     <ul>
//                         {this.state.tickets.map((ticket) =>
//                             console.log(ticket)(
//                                 <li>
//                                     Rij {ticket.zitplaats.rij} Kolom{" "}
//                                     {ticket.zitplaats.kolom}
//                                 </li>
//                             )
//                         )}
//                     </ul>
//                 ) : (
//                     <div>LOADING TICKETS</div>
//                 )}
//             </>
//         );
//     }
// }

export default function ZaalPlattegrond() {
    const [zitplaatsen, setZitplaatsen] = useState([]);

    useEffect(() => {
        fetch(apiPath + "Zitplaats")
            .then((response) => response.json())
            .then((data) => {
                setZitplaatsen(data);
                console.log(data);
            });
    }, []);
    return (
        <div className="box">
            {zitplaatsen.map((zitplaats) => (
                <Zitplaats state={{ zitplaats: zitplaats }}></Zitplaats>
            ))}
        </div>
    );
}
