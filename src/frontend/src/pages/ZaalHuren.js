import Layout from "../components/Layout";

function ZaalHuren() {
    return (
        <Layout>
          <div className="grid">
            <div className="box col-12">
              <h2>zaal huren</h2>
              <p>nformatie over zaal huren</p>
            </div>
            <div className="box col-12">
              <div className="box hoverborder">
                <h3>zaal 1</h3>
              </div>
              <div className="box hoverborder">
                <h3>zaal 2</h3>
              </div>
              <div className="box hoverborder">
                <h3>zaal 3</h3>
              </div>
              <div className="box hoverborder">
                <h3>zaal 4</h3>
              </div>
              <div className="box hoverborder">
                <h3>zaal 5</h3>
              </div>
              <div className="box hoverborder">
                <h3>zaal 6</h3>
              </div>
            </div>
          </div>
        </Layout>
    );
}

export default ZaalHuren;