import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const Home = ({ search, ranges, sortPrice, setHideFilters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  setHideFilters(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://orion-vinted-kevin-fachas.herokuapp.com/offers?title=${search}&priceMin=${ranges.price.value.min}&priceMax=${ranges.price.value.max}&sort=${sortPrice}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, ranges.price.value.min, ranges.price.value.max, sortPrice]);

  document.body.style.backgroundColor = "white";
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div className="subheader1">
        <div className="subheader2">
          <div className="bloc">
            <span>Prêts à faire du tri dans vos placards ?</span>
            <Link
              to={
                Cookies.get("userToken") === "undefined" ? "/login" : "/publish"
              }
            >
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </div>
      <main style={{}}>
        <div className="home">
          <ul>
            {data.offers.map((offer, index) => {
              return (
                <Link
                  onClick={() => {
                    setHideFilters(true);
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
