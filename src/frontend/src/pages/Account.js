import Layout from "../components/Layout";
import TicketLijstGebruiker from "../components/TicketLijstGebruiker";
import { getAuthTokenUser } from "../helper/AuthToken";
import Login from "./Login";

function Account() {
    const user = getAuthTokenUser();
    if (user === false) return Login();
    return (
        <Layout>
            <h1>Mijn account</h1>
            <p>Gebruiker: {user}</p>
            <h2>Tickets</h2>
            {<TicketLijstGebruiker />}
        </Layout>
    );
}

export default Account;

// import Layout from "../components/Layout";
// import { getAuthTokenUser } from "../helper/AuthToken";
// import Login from "./Login";
// import { apiPath } from "../helper/ApiPath";
// import axios from "axios";
// import { useEffect, useState } from "react";

// // const getTickets = () => {
// //     const userName = getAuthTokenUser();
// //     const [tickets, setTickets] = useState([]);
// //     useEffect(() => {
// //         axios
// //             .get(apiPath + "Ticket/GetTicketsCurrentUser/" + userName)
// //             .then((response) => {
// //                 console.log(response);
// //                 setTickets = response.data;
// //             });
// //     });
// //     return tickets;
// // const ticketLijst = [];
// // axios
// //     .get(apiPath + "Ticket/GetTicketsCurrentUser/" + userName)
// //     .then((response) => {
// //         response.data.map((ticket) =>
// //             ticketLijst.push(ticket.uitvoering.voorstelling.naam)
// //         );
// //         console.log("TICKETLIJST: " + ticketLijst);
// //         return ticketLijst;
// //     });

// // return axios
// //     .get(apiPath + "Ticket/GetTicketsCurrentUser/" + userName)
// //     .then((response) => {
// //         console.log(response);
// //         return response.data;
// //         // data has id, klant, uitvoering
// //         // console.log("RESPONSE VALUES: " + response.data.values());
// //         // var tickets = [];
// //         // console.log("UITVOERINGEN NAMEN: " + uitvoeringen);
// //         //     return (
// //         //         <ul>
// //         //             {response.data.values().map((ticket) => (
// //         //                 <li>
// //         //                     {console.log(ticket)}
// //         //                     {ticket.uitvoering.voorstelling.naam} &#40;
// //         //                     {ticket.uitvoering.beginTijd}&#41; -{" "}
// //         //                     {ticket.uitvoering.zaal.naam} rij:{" "}
// //         //                     {ticket.zitplaats.rij} kolom:{" "}
// //         //                     {ticket.zitplaats.kolom}
// //         //                 </li>
// //         //             ))}
// //         //         </ul>
// //         //     );
// //     });
// // };

// function Account() {
//     const user = getAuthTokenUser();
//     const GetTickets = () => {
//         const userName = getAuthTokenUser();
//         var [tickets, setTickets] = useState([]);
//         var [loaded, setLoaded] = useState(false);
//         useEffect(() => {
//             axios
//                 .get(apiPath + "Ticket/GetTicketsCurrentUser/" + userName)
//                 .then((response) => {
//                     console.log(response);
//                     setTickets = response.data;

//                 })
//                 .finally((setLoaded = true));
//         });
//         return { tickets, loaded };
//     };
//     const { tickets, loaded } = useState(GetTickets());

//     if (user == false) return Login();
//     // const tickets = getTickets().then();
//     if (loaded)
//         return (
//             <Layout>
//                 <h1>Mijn account</h1>
//                 <p>Gebruiker: {user}</p>
//                 <h2>Tickets</h2>
//                 <ul>
//                     {tickets.map((ticket) => (
//                         <li>
//                             {ticket.uitvoering.voorstelling.naam} &#40;
//                             {ticket.uitvoering.beginTijd}&#41; -{" "}
//                             {ticket.uitvoering.zaal.naam} rij:{" "}
//                             {ticket.zitplaats.rij} kolom:{" "}
//                             {ticket.zitplaats.kolom}
//                         </li>
//                     ))}
//                 </ul>
//             </Layout>
//         );
//     return (
//         <Layout>
//             <h1>Mijn account</h1>
//             <p>Gebruiker: {user}</p>
//             <h2>Tickets ophalen uit de database</h2>

//             {/* <ul>
//                 {getTickets().map((ticket) => (
//                     <li>Ticket {ticket}</li>
//                 ))}
//             </ul> */}

//             {/* <ul>
//                 {getTickets().then((tickets) =>
//                     tickets.map((ticket) => (
//                         <li>
//                             {console.log(
//                                 "VOORSTELLING: " +
//                                     ticket.uitvoering.voorstelling.naam
//                             )}
//                             {ticket.uitvoering.voorstelling.naam} &#40;
//                             {ticket.uitvoering.beginTijd}&#41; -{" "}
//                             {ticket.uitvoering.zaal.naam} rij:{" "}
//                             {ticket.zitplaats.rij} kolom:{" "}
//                             {ticket.zitplaats.kolom}
//                         </li>
//                     ))
//                 )} */}
//             {/* {getTickets()
//                     .then((tickets) => {
//                         return tickets;
//                     })
//                     .map((ticket) => (
//                         <li>
//                             {ticket.uitvoering.voorstelling.naam} &#40;
//                             {ticket.uitvoering.beginTijd}&#41; -{" "}
//                             {ticket.uitvoering.zaal.naam} rij:{" "}
//                             {ticket.zitplaats.rij} kolom:{" "}
//                             {ticket.zitplaats.kolom}
//                         </li>
//                     ))} */}
//             {/* </ul> */}
//         </Layout>
//     );
// }

// export default Account;
