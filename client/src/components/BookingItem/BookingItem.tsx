import NextBookingItem from './NextBookingItem';
import OngoingAndPastBookingItem from './OngoingAndPastBookingItem';

interface Props {
  requestId: string;
  from: Date;
  to: Date;
  status: string;
  upcoming?: boolean;
}

function BookingItem(props: Props): JSX.Element {
  const { requestId, from, to, status, upcoming } = props;

  return (
    <>
      {upcoming ? (
        <NextBookingItem key={requestId} requestId={requestId} from={from} to={to} status={status} />
      ) : (
        <OngoingAndPastBookingItem key={requestId} requestId={requestId} from={from} to={to} status={status} />
      )}
    </>
  );
}

export default BookingItem;
