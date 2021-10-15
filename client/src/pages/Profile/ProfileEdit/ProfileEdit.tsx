import ProfileEditForm from './ProfileEditForm/ProfileEditForm';
import useStyles from './useStyles';

export default function ProfileEdit(): JSX.Element {
  return (
    //On submit this should submit to /profile/create
    //or /profile/update depending on if the user has an profile
    <ProfileEditForm />
  );
}
