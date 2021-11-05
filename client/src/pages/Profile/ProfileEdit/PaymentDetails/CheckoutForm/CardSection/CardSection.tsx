import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import useStyles from '../useStyles';

const CardOptions = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function CardSection() {
  const classes = useStyles();

  return (
    <label>
      Card details
      <CardElement options={CardOptions} />
    </label>
  );
}

export default CardSection;
