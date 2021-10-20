import { useState, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';

const AuthMenu = (): JSX.Element => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { loggedInUser, logout } = useAuth();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleMenuitemClick = (linkString: string) => {
    handleClose();
    history.push(linkString);
  };

  return (
    <>
      <IconButton aria-label="show auth menu" aria-controls="auth-menu" aria-haspopup="true" onClick={handleClick}>
        <AvatarDisplay loggedIn user={loggedInUser} />
      </IconButton>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={() => handleMenuitemClick('/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AuthMenu;
