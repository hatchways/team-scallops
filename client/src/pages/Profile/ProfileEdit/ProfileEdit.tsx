import ProfileEditForm from './ProfileEditForm/ProfileEditForm';

export default function ProfileEdit(): JSX.Element {
  return (
    //On submit this should submit to /profile/create
    //or /profile/update depending on if the user has an profile

    <div>
      <ProfileEditForm />
    </div>
  );
}
