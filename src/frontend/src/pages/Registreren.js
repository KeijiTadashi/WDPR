import Layout from "../components/Layout";

function Register() {
    fetch("https://wdprwebapi.azurewebsites.net", {
        method: 'POST',
        headers: {

        },
        body: {

        }
    })
      .then(response => {
          if(response.ok) {
              console.log("OK")
          } else {
              console.log("Error")
          }
      });
}

function Registreren() {
    return (
        <Layout>
            <form>
                <label>Naam</label><br/>
                <input/><br/>
                <label>Email</label><br/>
                <input/><br/>
                <label>Telefoon nummer</label><br/>
                <input/><br/>
                <button onClick={Register}>Registreer</button>
            </form>
        </Layout>
    );
}

export default Registreren;