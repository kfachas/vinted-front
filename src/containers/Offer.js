import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://orion-vinted-kevin-fachas.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="offer">
      <Link to="/home">Home</Link>
      <p>id : {id}</p>
      <div>
        <img src={data.product_image} alt={data.product_name} />
      </div>
      <div className="product">
        <span>{data.product_name}</span>
        <p>{data.product_description}</p>
        <span>{data.product_price} €</span>
      </div>
    </div>
  );
};

export default Offer;
