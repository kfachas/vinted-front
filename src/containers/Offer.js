import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
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
  document.body.style.backgroundColor = "#eaedee";
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Header margin={"35px"} />
      <main>
        <div className="offer">
          <div>
            <img src={data.product_image} alt={data.product_name} />
          </div>
          <div className="product">
            <h3>{data.product_price} €</h3>
            <div className="desc">
              <ul>
                <li>MARQUE</li>
                <li>TAILLE</li>
                <li>ÉTAT</li>
                <li>COULEUR</li>
                <li>EMPLACEMENT</li>
              </ul>
              <ul>
                <li>{data.product_details[0].MARQUE}</li>
                <li>{data.product_details[1].TAILLE}</li>
                <li>{data.product_details[2].ÉTAT}</li>
                <li>{data.product_details[3].COULEUR}</li>
                <li>{data.product_details[4].EMPLACEMENT}</li>
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
            <button>Acheter</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Offer;
