import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import reportWebVitals from './reportWebVitals';
const stripePromise = loadStripe('pk_test_51QlYOWRvg7xtjAs52WDGyOt4edVasF6lTQEJwaEQr5iTmABGBL9FcOGcGuxZDP0R00oDwbXWxt7tgVhQHq2BWl5X00tcrhr9rV');
// const options = {
//   // passing the client secret obtained from the server
//   clientSecret: '{{CLIENT_SECRET}}',
// };
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Elements stripe={stripePromise}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Elements>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
