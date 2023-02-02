import Layout from "../components/Layout";
import {Link} from "react-router-dom";

export default function Reserveren() {
  return (
    <Layout>
      <div className="grid">
        <div className="col-12 box">
        <Link to={"/winkelmand"}>
          <button>Koop</button>
        </Link>
        </div>
      </div>
    </Layout>
  );
}