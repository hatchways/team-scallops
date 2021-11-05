import React, { useCallback, useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection/CardSection';
import { CheckCircle, ContactsOutlined } from '@material-ui/icons';
import { Box, Button, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';

import { addCardApi, getCards, updateDefaultCard } from '../../../../../helpers/APICalls/paymentApi';
import clsx from 'clsx';
import { CardDetails } from '../../../../../interface/Payment';
import { useSnackBar } from '../../../../../context/useSnackbarContext';
import useStyles from './useStyles';
import { da } from 'date-fns/locale';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [cards, setCards] = useState<CardDetails[]>([]);
  const [defaultCardId, setDefaultCardId] = useState<string>('');
  const [addCard, setAddCard] = useState(false);
  const [savingCard, setSavingCard] = useState(false);

  const fetchNewCards = useCallback(() => {
    getCards().then((result) => {
      if (!!result.success) {
        console.log(result.success);
        setCards(result.success?.cards);
        setDefaultCardId(result.success?.defaultCardId);
      } else {
        // Some error here with snackBar
      }
    });
  }, []);

  useEffect(() => {
    fetchNewCards();
  }, [fetchNewCards]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setSavingCard(true);

    const card = elements.getElement(CardElement);
    if (!card) return;
    const result = await stripe.createToken(card);

    if (result.error) {
      console.log(result.error.message);
    } else {
      addCardApi(result.token).then((data) => {
        if (!!data.success) {
          fetchNewCards();
          setAddCard(false);
          setSavingCard(false);
        }
      });
    }

    // const card = elements.getElement(CardElement);
    // if (!card) return;
    // const result = await stripe.createToken(card);

    // if (result.error) {
    //   console.log(result.error.message);
    // } else {
    //   sendStripeToken(result.token);
    //   console.log('Do something with result.token');
    // }
  };

  const changeDefault = (cardId: string) => {
    if (cardId === defaultCardId) return;
    updateDefaultCard(cardId).then((data) => {
      if (!!data.success) {
        setDefaultCardId(data.success.defaultCardId);
      } else {
        updateSnackBarMessage(data.error?.message || 'Some Error occured while update the default card');
      }
    });
  };

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

  return (
    <Box padding="3rem 6rem">
      <Grid container justify="center" component={Paper} className={classes.container}>
        <Typography align="center" variant="h5" className={classes.heading} component="h2">
          Payment Methods
        </Typography>
        <Typography align="left" variant="body1" className={classes.subheading}>
          Saved Payment Profiles:
        </Typography>
        <Grid container direction="row" alignItems="center" className={classes.cardContainer}>
          {cards.length ? (
            cards.map((card) => (
              <Box
                key={card.id}
                display="flex"
                flexDirection="column"
                className={classes.card}
                onClick={() => changeDefault(card.id)}
              >
                <Box display="flex" justifyContent="space-between">
                  {/* <img
                    src={cardLogos.find(({ brand }) => brand === method.brand)?.logo || defaultCardLogo}
                    alt={method.brand}
                    className={classes.image}
                  /> */}
                  {defaultCardId === card.id && <CheckCircle color="primary" />}
                </Box>
                <Typography variant="body1" className={classes.bold}>
                  **** **** **** {card.last4}
                </Typography>
                <Typography variant="button" className={clsx(classes.bold, classes.light)}>
                  {/* Exp. date {formatCardDate(method.expMonth)}/{formatCardDate(method.expYear)} */}
                </Typography>
                <Typography variant="h6" className={classes.bold}>
                  {card.name}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography align="center" variant="h6">
              No cards to display
            </Typography>
          )}
        </Grid>
        <Box display="flex" alignContent="flex-start" width="100%">
          {addCard ? (
            <form onSubmit={handleSubmit} className={classes.form}>
              <CardElement options={CardOptions} />
              <Button type="submit" color="primary" variant="outlined" className={classes.formButton}>
                {savingCard ? <CircularProgress size="2rem" thickness={1.5} /> : 'Add card'}
              </Button>
            </form>
          ) : (
            <Button disabled={!stripe} onClick={() => setAddCard(true)} color="primary" variant="outlined" size="large">
              Add new payment profile
            </Button>
          )}
        </Box>
      </Grid>
    </Box>
  );
}

export default CheckoutForm;
