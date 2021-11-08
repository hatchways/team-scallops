import { Token } from 'typescript';
import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { GetCardsApiData } from '../../interface/Payment';
import { DefaultCardApiData } from '../../interface/Payment';

export const sendStripeToken = async (token: any): Promise<AuthApiData> => {
  const paymentData = {
    stripeToken: token.id,
  };

  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  };
  return await fetch(`/payment/pay`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const addCardApi = async (token: any): Promise<AuthApiData> => {
  const paymentData = {
    stripeToken: token.id,
  };

  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  };
  return await fetch(`/payment/add`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getCards = async (): Promise<GetCardsApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payment`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const updateDefaultCard = async (cardId: string): Promise<DefaultCardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await fetch(`/payment/${cardId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
