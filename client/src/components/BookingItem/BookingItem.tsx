import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { getSitterProfile } from '../../helpers/APICalls/profile';
import { Profile } from '../../interface/Profile';
import { User } from '../../interface/User';
import NextBookingItem from './NextBookingItem';
import OngoingAndPastBookingItem from './OngoingAndPastBookingItem';

interface Props {
  requestId: string;
  from: Date;
  to: Date;
  owner: User;
  sitter: User;
  status: string;
  upcoming?: boolean;
  past?: boolean;
}

function BookingItem(props: Props): JSX.Element {
  const { requestId, from, to, owner, sitter, status, upcoming, past } = props;

  const [profile, setProfile] = useState<Profile>();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    async function getProfile() {
      const userProfile = await (loggedInUser?.isSitter ? getSitterProfile(owner) : getSitterProfile(sitter));
      setProfile(userProfile);
    }
    getProfile();
  }, [loggedInUser?.isSitter, owner, sitter]);

  const fullName = `${profile?.profile.firstName} ${profile?.profile.lastName}`;
  const photo = profile?.profile.image.url;

  return (
    <>
      {upcoming ? (
        <NextBookingItem
          key={requestId}
          requestId={requestId}
          from={from}
          to={to}
          name={fullName}
          image={photo}
          status={status}
        />
      ) : (
        <OngoingAndPastBookingItem
          key={requestId}
          requestId={requestId}
          from={from}
          to={to}
          name={fullName}
          image={photo}
          status={status}
          past={past}
        />
      )}
    </>
  );
}

export default BookingItem;
