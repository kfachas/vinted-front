import { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  // CardCvcElement,
  // CardExpiryElement,
  // CardNumberElement,
} from "@stripe/react-stripe-js";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

const CheckoutForm = ({ userToken, setHideFilters }) => {
  setHideFilters(true);
  const history = useHistory();
  const location = useLocation();
  const { title, price, owner, description } = location.state;
  const stripe = useStripe();
  const elements = useElements();

  const [success, setSuccess] = useState(false);
  const total = price + 0.8 + 0.4;
  total.toFixed(2);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // take the input of user's bank data
      const cardElement = elements.getElement(CardElement);

      // Create token from stripe and check bank data
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userToken,
      });
      const stripeToken = stripeResponse.token.id;

      // send the stripe token at the back-end
      const response = await axios.post(
        "https://orion-vinted-kevin-fachas.herokuapp.com/payment",
        {
          stripeToken,
          price: total.toFixed(2),
          description,
        }
      );
      console.log(response);
      // if the user's bank data are fine, so send success message
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return (
    <main className="checkoutForm">
      {!success ? (
        <form onSubmit={handleSubmit}>
          <ul>
            <li>{title}</li>
            <li>{description}</li>
            <li>Vendeur : {owner}</li>
            <li>Prix initial : {price}€</li>
            <li>Frais protection acheteurs : 0.40 €</li>
            <li>Frais de port : 0.80 €</li>
          </ul>
          <span>Total: {total.toFixed(2)} €</span>
          <CardElement />
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
    </main>
  );
};

export default CheckoutForm;
