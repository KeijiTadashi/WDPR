import Layout from "../components/Layout";
import ZaalPlattegrond from "../components/ZaalPlattegrond";
import {Link} from "react-router-dom";

function UitvoeringReserveren() {
    return (
        <Layout>
          <div className="grid">
            <h1 className="col-12">Kies zitplaatsen</h1>
            <ZaalPlattegrond />
            <Link to={"/reserveren"}>
              <button>reserveren</button>
            </Link>
          </div>
        </Layout>
    );
}

export default UitvoeringReserveren;