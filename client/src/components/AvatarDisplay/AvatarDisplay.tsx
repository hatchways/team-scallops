import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User | undefined | null;
  size?: number;
}

const AvatarDisplay = (props: Props): JSX.Element => {
  return (
    <Avatar
      alt="Profile Image"
      style={{ width: props.size, height: props.size }}
      src={`https://robohash.org/${props.user?.email}.png`}
    />
  );
};

export default AvatarDisplay;
