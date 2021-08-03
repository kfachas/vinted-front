import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

const Publish = ({ userToken }) => {
  const history = useHistory();
  const [items, setItems] = useState({});
  const [picture, setPicture] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", items.title);
      formData.append("description", items.description);
      formData.append("brand", items.brand);
      formData.append("size", items.size);
      formData.append("color", items.color);
      formData.append("condition", items.condition);
      formData.append("city", items.city);
      formData.append("price", items.price);

      const response = await axios.post(
        "https://orion-vinted-kevin-fachas.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data._id) {
        history.push(`offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  document.body.style.backgroundColor = "#eaedee";

  return Cookies.get("userToken") === "undefined" ? (
    <Redirect to="/login" />
  ) : (
    <main className="publish">
      <h3>Vends tes articles</h3>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <input
              required
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </li>
          <li>
            <h4>Titre</h4>
            <input
              required
              type="text"
              placeholder="Titre"
              onChange={(event) => {
                const obj = { ...items };
                obj.title = event.target.value;
                setItems(obj);
              }}
            />
          </li>
          <li>
            <h4>Décris ton article</h4>
            <textarea
              required
              placeholder="Décris ton article"
              cols="50"
              row="5"
              onChange={(event) => {
                const obj = { ...items };
                obj.description = event.target.value;
                setItems(obj);
              }}
            />
          </li>
          <li>
            <h4>Marque</h4>
            <input
              required
              type="text"
              placeholder="Marque"
              onChange={(event) => {
                const obj = { ...items };
                obj.brand = event.target.value;
                setItems(obj);
              }}
            />
          </li>
          <li>
            <h4>Taille</h4>
            <input
              required
              type="text"
              placeholder="Taille"
              onChange={(event) => {
                const obj = { ...items };
                obj.size = event.target.value;
                setItems(obj);
              }}
            />
          </li>
          <li>
            <h4>Couleur</h4>
            <input
              required
              type="text"
              placeholder="Couleur"
              onChange={(event) => {
                const obj = { ...items };
                obj.color = event.target.value;
                setItems(obj);
              }}
            />
          </li>
          <li>
            <h4>Etat</h4>
            <input
              required
              type="text"
              placeholder="Etat"
              onChange={(event) => {
                const obj = { ...items };
                obj.condition = event.target.value;
                setItems(obj);
              }}
            />
          </li>
          <li>
            <h4>Emplacement</h4>
            <input
              required
              type="text"
              placeholder="Lieu"
              onChange={(event) => {
                const obj = { ...items };
                obj.city = event.target.value;
                setItems(obj);
              }}
            />
          </li>
          <li>
            <h4>Price</h4>
            <div>
              <input
                required
                type="price"
                placeholder="0.00 €"
                onChange={(event) => {
                  const obj = { ...items };
                  obj.price = event.target.value;
                  setItems(obj);
                }}
              />
              <div>
                <input type="checkbox" />
                <span>Je suis intéréssé(e) par les échanges</span>
              </div>
            </div>
          </li>
          <li></li>
        </ul>
        <input
          type="submit"
          style={{
            backgroundColor: "#09b0ba",
            color: "white",
            borderRadius: "5px",
            width: "100px",
          }}
        />
      </form>
    </main>
  );
};

export default Publish;
