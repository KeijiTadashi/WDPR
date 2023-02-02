import Zitplaats from "./Zitplaats";
import { useEffect, useState } from "react";
import { apiPath } from "../helper/ApiPath";


export default function ZaalPlattegrond() {
    const [zitplaatsen, setZitplaatsen] = useState([]);

    useEffect(() => {
        fetch(apiPath + "Zitplaats")
            .then((response) => response.json())
            .then((data) => {
                setZitplaatsen(data);
                console.log(data);
            });
    }, []);
  return (
    <div className="box">
      {zitplaatsen.map((zitplaats) => 
        (<Zitplaats state={{zitplaats : zitplaats}}></Zitplaats>))}
    </div>
  );
  }