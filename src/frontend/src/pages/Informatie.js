import Layout from "../components/Layout";

function Informatie() {
    return (
        <Layout>
          <div className="grid">
            <h1 className="col-12">Informatie</h1>

            <div className="image col-7 aspect-ratio-4-3">
              <img src="" alt="foto van theater"></img>
            </div>

            <div className="box col-5">
              <h2>Theater Laak</h2>
              <p>Theater Laak probeert kunst persoonlijk te maken. Dat betekent dat we kunst op zo veel verschillende manieren brengen dat er voor iedereen een mogelijkheid is het zich eigen te maken en te beleven. Dat kunst niet eng is of niet voor jou, maar dat kunst echt voor en van iedereen is. Als je maar een manier vindt of krijgt aangeboden die bij je past. </p>
            </div>

            <div className="box col-5">
              <h2>Samen programma maken</h2>
              <p>Theater Laak is uniek. Wij maken ons programma samen met de wijkbewoners uit Laak. Samen met mensen die hun liefde voor cultuur willen delen. Hun liefde voor film, fotografie, (jeugd)theater of muziek. Mensen met een idee kunnen gewoon binnenlopen. We kijken dan samen hoe we dat idee, die wens of droom waar kunnen maken. </p>
            </div>

            <div className="image col-7 aspect-ratio-4-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2453.2643892905485!2d4.309994777547799!3d52.05670937042577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b6c3a05250e3%3A0x6de65caf4ed9d557!2sLaaktheater!5e0!3m2!1sen!2snl!4v1675376076661!5m2!1sen!2snl"
                width="100%" height="100%" allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">

              </iframe>
            </div>

            <div className="box col-12">
                <h2>Contactgegevens</h2>
                <p>Email: info@laaktheater.nl</p>
                <p>Tel nummer: 070 393 33 48</p>
                <h3>Adres: </h3>
                <p>Ferrandweg 4-T</p>
                <p>2532XT</p>
                <p>Den Haag</p>
            </div>
          </div>
        </Layout>
    );
}

export default Informatie;