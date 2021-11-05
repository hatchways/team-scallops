import { useState, MouseEvent } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { format } from 'date-fns';

import { updateRequest } from '../../helpers/APICalls/requests';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  requestId: string;
  from: Date;
  to: Date;
  name: string;
  image: string | undefined;
  status: string;
  past?: boolean;
}

function OngoingAndPastBookingItem(props: Props): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  const { requestId, from, to, name, image, status, past } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentStatus, setCurrentStatus] = useState<string>(status);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = async () => {
    setAnchorEl(null);
    const result = await updateRequest(requestId, 'ACCEPTED');
    const {
      request: { status },
    } = result;

    setCurrentStatus(status);
  };

  const handleDecline = async () => {
    setAnchorEl(null);
    const result = await updateRequest(requestId, 'DECLINED');
    const {
      request: { status },
    } = result;

    setCurrentStatus(status);
  };

  return (
    <>
      <CardContent>
        <Paper variant="outlined" square>
          <CardHeader
            action={
              loggedInUser?.isSitter &&
              !past && (
                <>
                  <IconButton aria-label="more" onClick={handleClick}>
                    <SettingsIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} elevation={0}>
                    <MenuItem onClick={handleAccept}>Accept</MenuItem>
                    <MenuItem onClick={handleDecline}>Decline</MenuItem>
                  </Menu>
                </>
              )
            }
            title={`${format(new Date(from), 'd MMMM yyyy')} - ${format(new Date(to), 'd MMMM yyyy')}`}
            disableTypography
          />
          <CardContent>
            <Typography color="textSecondary" align="right">
              {currentStatus}
            </Typography>
            <Box className={classes.details}>
              <Avatar aria-label="next-booking" alt="Person" src={image} className={classes.large} />
              <Typography variant="h6" color="textPrimary" display="inline">
                {name}
              </Typography>
            </Box>
          </CardContent>
        </Paper>
      </CardContent>
    </>
  );
}

export default OngoingAndPastBookingItem;
