import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { Notification } from '../../../interface/notification/Notification';
import { Link } from 'react-router-dom';
import { setUnreadNotificationToRead } from '../../../helpers/APICalls/notifications';
import moment from 'moment';

interface IProps {
  notification: Notification;
}

const NotificationRequest: React.FC<IProps> = ({
  notification: { _id, type, createdAt, senderProfile },
}): JSX.Element => {
  const classes = useStyles();

  const changeUnreadToRead = () => {
    setUnreadNotificationToRead(_id);
  };
  const date = moment(createdAt).format('MM/DD/YYYY');
  const hour = moment(createdAt).endOf('day').fromNow();

  return (
    <Box display="flex" alignItems="center" m={2}>
      <Avatar variant="square" src={`/${senderProfile.image}`} className={classes.large} />
      <Box>
        <Link onClick={changeUnreadToRead} to={type === 'Service' ? '/my-sitters' : '/messages'}>
          <Typography variant="h6" className={classes.bold}>
            {`${senderProfile.firstName}`} has requested your service for hours {`${hour}`}
          </Typography>
        </Link>
        <Typography className={` ${classes.bold} ${classes.opacity}`}></Typography>
        <Typography variant="h6" className={classes.bold}>
          {`${date}`}
        </Typography>
      </Box>
    </Box>
  );
};
export default NotificationRequest;
