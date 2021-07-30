import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Home = ({ search, state, sortPrice, setPageOffer }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  setPageOffer(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://orion-vinted-kevin-fachas.herokuapp.com/offers?title=${search}&priceMin=${state.price.value.min}&priceMax=${state.price.value.max}&sort=${sortPrice}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, state.price.value.min, state.price.value.max, sortPrice]);

  document.body.style.backgroundColor = "white";
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div className="subheader1">
        <div className="subheader2">
          <div className="bloc">
            <span>Prêts à faire du tri dans vos placards ?</span>
            <Link to="/publish">
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </div>
      <main>
        <div className="home">
          <ul>
            {data.offers.map((offer, index) => {
              return (
                <Link
                  onClick={() => {
                    setPageOffer(false);
                  }}
                  to={`offer/${offer._id}`}
                  style={{ color: "inherit" }}
                  key={offer._id}
                >
                  <li>
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
