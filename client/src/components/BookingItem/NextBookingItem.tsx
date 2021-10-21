import { useState, MouseEvent } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';

import person from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
import useStyles from './useStyles';

function NextBookingItem(): JSX.Element {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CardContent>
        <Box className={classes.main}>
          {/* TODO: Change harcoded date to booking(request) start date inside props. */}
          <Typography variant="h5" className={classes.pos}>
            5 April 2020, 10-12 AM
          </Typography>
          <IconButton aria-label="more" onClick={handleClick}>
            <SettingsIcon />
          </IconButton>
          <Menu id="settings" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} elevation={0}>
            <MenuItem>Accept</MenuItem>
            <MenuItem>Decline</MenuItem>
          </Menu>
        </Box>
        <Box className={classes.details}>
          {/* TODO: Change mock image to user profile photo inside props. */}
          <Avatar aria-label="next-booking" alt="Person" src={person} className={classes.large} />
          {/* TODO: Change hardcoded name to user name inside props. */}
          <Typography variant="h6" color="textPrimary" display="inline">
            Norma Byers
          </Typography>
        </Box>
      </CardContent>
    </>
  );
}

export default NextBookingItem;
