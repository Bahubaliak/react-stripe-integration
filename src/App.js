import './App.css';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(ADD-YOUR-STRIPE-PUBLIC-KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [postal_code, setPostalCode] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const paymentMethod = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: 'Jenny Rosen',
        address: {
          postal_code: postal_code
        }
      },
    }).then((response)=>{
      console.log("token",response);
    })
    console.log(paymentMethod);
    
  };
  
  return (
    <div className="text-centered">
      <form onSubmit={handleSubmit}>
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />
      <input 
      type="text"
      value={postal_code}
      onChange={(e)=>{
      setPostalCode(e.target.value)
      console.log(e.target.value);
      }}
      /><br/>
      
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
    </div>
    
  );
};

function App() {
  return (
    <div className="App mt-5">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
