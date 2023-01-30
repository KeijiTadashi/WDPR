import {Link} from "react-router-dom";

function Reserveer() {

}

export default function Zitplaats(props) {
  let statusColor;

  if (props.status === "beschikbaar") {
    statusColor = "white";
  } else {
    statusColor = "red";
  }

  return (
    <Link to={"/reserveren"}>
      <div className={"zitplaats"} onClick={Reserveer} style={{background: statusColor}}>
      </div>
    </Link>
  );
}