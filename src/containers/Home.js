import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import subheaderImg from "../subheader.jpeg";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
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
  document.body.style.backgroundColor = "white";
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Header />
      <div className="subheader1">
        <div className="subheader2">
          <div className="bloc">
            <span>Prêts à faire du tri dans vos placards ?</span>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <main>
        <div className="home">
          <ul>
            {data.offers.map((offer, index) => {
              return (
                <Link to={`offer/${offer._id}`}>
                  <li key={offer._id}>
                    <div
                      className="avatar"
                      style={{
                        justifyContent: !offer.owner.account.avatar && "center",
                      }}
                    >
                      {offer.owner.account.avatar && (
                        <img
                          src={offer.owner.account.avatar}
                          alt={offer.owner.account.username}
                        />
                      )}
                      <p>{offer.owner.account.username}</p>
                    </div>
                    <img src={offer.product_image} alt={offer.product_name} />

                    <span>{offer.product_name}</span>
                    <span>{offer.product_price} €</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Home;
