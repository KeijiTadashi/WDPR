import {Link} from "react-router-dom";
import Layout from "../components/Layout";

export default function Voorstelling() {
  return (
    <>
      <Layout>
        <div className="grid">
          <h1 className="col-12">Voorstelling</h1>

          <div className="image col-8 aspect-ratio-4-3">
            <img src="" alt="foto van voorstelling"></img>
          </div>
          <div className="box col-4">
            <h2>datums</h2>
            <Link to={"/uitvoering/:id"}>
              <button>datum 1</button>
            </Link>
            <Link to={"/uitvoering/:id"}>
              <button>datum 2</button>
            </Link>
          </div>

          <div className="box col-12">
            <h2>informatie over voorstelling</h2>
            <p>Lorem ipsum dolor sit amet,</p>
            <p>consectetur adipiscing elit, sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}