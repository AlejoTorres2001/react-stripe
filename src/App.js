import "bootswatch/dist/quartz/bootstrap.min.css"
import './App.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './components/CheckoutForm';

const stripePromise = loadStripe("pk_test_51JzVS1IxTZLWehEm6YPmHndHmGVoimYpO1s7YCSHDFyo8APncgpR9vN2XrvmwIBAenMRIKwhwNvoHCCOD0JHi5Bu00GkkLUv3O")

function App() {
  return (
  <Elements stripe={stripePromise}>
    <div className="container p-4">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <CheckoutForm />
          </div>
      </div>
    </div>
  </Elements>
  );
}

export default App;
