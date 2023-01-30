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
              <p>Lorem ipsum dolor sit amet,</p>
              <p>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            <div className="box col-5">
              <h2>Bereikbaarheid</h2>
              <p>Lorem ipsum dolor sit amet,</p>
            </div>

            <div className="image col-7 aspect-ratio-4-3">
              google maps frame
            </div>

            <div className="box col-12">
                <h2>Contactgegevens</h2>
                <p>Email: </p>
                <p>Tel nummer: </p>
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