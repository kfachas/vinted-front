import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

const CheckoutForm = ({ userToken }) => {
  const history = useHistory();
  const location = useLocation();
  const { title, price, owner, description } = location.state;
  const stripe = useStripe();
  const elements = useElements();

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);

      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userToken,
      });
      const stripeToken = stripeResponse.token.id;
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(
        "https://orion-vinted-kevin-fachas.herokuapp.com/payment",
        {
          stripeToken,
          price,
          description,
        }
      );
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <span>{title}</span>
          <br />
          <span>{description}</span>
          <br />
          <span>Vendeur : {owner}</span>
          <br />
          <span> {price}€</span>
          <br />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <>
          <span>
            Paiement effectué ! Vous recevrez par mail un moyen de suivre votre
            colis. <br />
            Vous allez être redigérer vers l'accueil.
          </span>
          {setTimeout(function () {
            history.push("/");
          }, 6000)}
        </>
      )}
    </>
  );
};

export default CheckoutForm;
