import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentSection from './PaymentSection/PaymentSection';

const stripePromise = loadStripe(
  'pk_test_51JsCHVE6DlgyDM3JdxzrMfcKWT4ySJLl6lCcGsUntd0UF5hc4sTKvNZ7JsU12ixyb4A4v9s955ZZIOK0qSmi2uOx00zb9gkIln',
);

function PaymentDetails() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentSection />
    </Elements>
  );
}

export default PaymentDetails;
