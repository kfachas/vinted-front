import { useParams, Link } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  return (
    <div>
      <Link to="/home">Home</Link>
      <p>id : {id}</p>
    </div>
  );
};

export default Offer;
