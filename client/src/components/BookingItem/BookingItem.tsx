import NextBookingItem from './NextBookingItem';
import OngoingAndPastBookingItem from './OngoingAndPastBookingItem';

interface Props {
  upcoming?: boolean;
}

function BookingItem(props: Props): JSX.Element {
  const { upcoming } = props;

  return <>{upcoming ? <NextBookingItem /> : <OngoingAndPastBookingItem />}</>;
}

export default BookingItem;
