import { useState, MouseEvent } from 'react';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './useStyles';
import person from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';

interface Props {
  title: string;
  upcoming?: boolean;
}

function BookingItem(props: Props): JSX.Element {
  const classes = useStyles();

  const { title, upcoming } = props;
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
      {upcoming ? (
        <>
          <CardHeader
            action={
              <>
                <IconButton aria-label="more" onClick={handleClick}>
                  <SettingsIcon />
                </IconButton>
                <Menu id="settings" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} elevation={0}>
                  <MenuItem>View</MenuItem>
                  <MenuItem>Accept</MenuItem>
                  <MenuItem>Decline</MenuItem>
                </Menu>
              </>
            }
            title={title.toUpperCase()}
            disableTypography
          />
          <CardContent>
            {/* TODO: Change harcoded date to booking(request) start date inside props. */}
            <Typography variant="h5" className={classes.pos}>
              5 April 2020, 10-12 AM
            </Typography>
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
      ) : (
        <>
          <CardHeader title={title.toUpperCase()} disableTypography />
          <CardContent>
            <Paper variant="outlined" square>
              <CardHeader
                action={
                  <>
                    <IconButton aria-label="more" onClick={handleClick}>
                      <SettingsIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} elevation={0}>
                      <MenuItem>View</MenuItem>
                      <MenuItem>Accept</MenuItem>
                      <MenuItem>Decline</MenuItem>
                    </Menu>
                  </>
                }
                // TODO: Change harcoded date to booking(request) start date inside props.
                title="5 April 2020, 10-12 AM"
                disableTypography
              />
              <CardContent>
                {/* TODO: Change harcoded status to booking(request) status inside props. */}
                <Typography color="textSecondary" align="right">
                  Accepted
                </Typography>
                <Box className={classes.details}>
                  {/* TODO: Change mock image to user profile photo inside props. */}
                  <Avatar aria-label="next-booking" alt="Person" src={person} className={classes.large} />
                  {/* TODO: Change hardcoded name to user name inside props. */}
                  <Typography variant="h6" color="textPrimary" display="inline">
                    Norma Byers
                  </Typography>
                </Box>
              </CardContent>
            </Paper>
          </CardContent>
        </>
      )}
    </>
  );
}

export default BookingItem;
