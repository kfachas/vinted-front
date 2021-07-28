import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const id = "23230203290302";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://orion-vinted-kevin-fachas.herokuapp.com/offers"
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
    <main>
      <Header />
      <div className="home">
        <ul>
          {data.offers.map((offer, index) => {
            return (
              <Link to={`offer/${offer._id}`}>
                <li key={offer._id}>
                  <span>{offer.owner.account.username}</span>
                  <img src={offer.product_image} alt={offer.product_name} />

                  <span>
                    {offer.product_name} {offer.product_price} €
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Home;
