import {Link} from "react-router-dom";

function Reserveer(props) {
    console.log(props)
}

export default function Zitplaats(props) {
  let statusColor;

  if (props.status === "beschikbaar") {
    statusColor = "white";
  } else {
    statusColor = "red";
  }

  return (
      <div className={"zitplaats"} onClick={() => Reserveer(props)} style={{background: statusColor}}>
      </div>
  );
}