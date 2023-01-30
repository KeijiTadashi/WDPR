import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
 
function Kalender() {
    return (
        <Layout>
            <div className="grid">
                <div className="col-12">
                <Carousel />
                </div>
                <div className="box col-12" style={{height: "200px"}}>hello</div>
            </div>
        </Layout>
    );
}
 
export default Kalender;
