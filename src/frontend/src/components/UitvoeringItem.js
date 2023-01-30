import {Link} from "react-router-dom";

export default function UitvoeringItem(props) {
  const voorstelling = props.uitvoering.voorstelling;

  return (
        <Link to={`/uitvoering/${props.uitvoering.id}`}>
            <h2>{voorstelling.naam}</h2>
            <p>{voorstelling.beschrijving}</p>
            <p>{voorstelling.date}</p>
            <button>Tickets</button>
        </Link>
    );
}