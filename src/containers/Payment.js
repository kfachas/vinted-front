import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JKLPFG1e6lZLhCEjWpz4IG71ZXHEhs7Fbq6k708PlJ8UnouvpzPZqX16kI6Lp9ognjT6GYcfri1tZ8f0u47EOxN00PO93EGPh"
);

const Payment = ({ userToken, setHideFilters }) => {
  document.body.style.backgroundColor = "#eaedee";
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm userToken={userToken} setHideFilters={setHideFilters} />
    </Elements>
  );
};

export default Payment;
