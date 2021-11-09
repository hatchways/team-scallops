export interface CardDetails {
  id: string;
  brand: string;
  expYear: string;
  expMonth: string;
  last4: string;
  name: string;
}

export interface GetCardsSuccess {
  cards: CardDetails[];
  defaultCardId: string;
}

export interface GetCardsApiData {
  error?: { message: string };
  success?: GetCardsSuccess;
}

export interface DefaultCardSuccess {
  defaultCardId: string;
}

export interface DefaultCardApiData {
  error?: { message: string };
  success?: DefaultCardSuccess;
}
