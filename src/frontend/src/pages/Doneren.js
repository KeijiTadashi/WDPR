import Layout from "../components/Layout";

function Doneren() {
    return (
        <Layout>
          <div className="grid">
            <div className="box col-6">
              <h2>Informatie over doneren</h2>
              <p>lorum ipsum</p>
            </div>
            <div className="image aspect-ratio-4-3 col-6">
              <img src="" alt="foto van theater"></img>
            </div>

            <div className="box col-12">
              <h2>Informatie Doneren</h2>
              <p>lorum ipsum</p>
              <button>Doneer</button>
            </div>
          </div>
        </Layout>
    );
}

export default Doneren;