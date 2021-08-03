import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Offer = ({ userToken }) => {
  const history = useHistory();
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
  }, [id]);
  document.body.style.backgroundColor = "#eaedee";
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <main>
        <div className="offer">
          <div>
            <img src={data.product_image} alt={data.product_name} />
          </div>
          <div className="product">
            <h3>{data.product_price} €</h3>
            <div className="desc">
              <ul>
                {data.product_details.map((elem, index) => {
                  const keys = Object.keys(elem);
                  return (
                    <li key={index}>
                      <span style={{ color: "rgb(177, 177, 177)" }}>
                        {keys[0]}
                      </span>
                      <span>{elem[keys[0]]}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="owner">
              <p style={{ fontWeight: "bold", fontSize: "17px" }}>
                {data.product_name}
              </p>
              <p style={{ color: "rgb(177, 177, 177)" }}>
                {data.product_description}
              </p>
              <ul>
                <li>
                  {data.owner.account.avatar && (
                    <img
                      src={data.owner.account.avatar}
                      alt={data.owner.account.username}
                    />
                  )}
                </li>
                <li>{data.owner.account.username}</li>
              </ul>
            </div>
            <button
              onClick={() => {
                if (Cookies.get("userToken") === "undefined") {
                  history.push("/login");
                } else {
                  history.push("/payment", {
                    title: data.product_name,
                    price: data.product_price,
                    owner: data.owner.account.username,
                    description: data.product_description,
                  });
                }
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Offer;
