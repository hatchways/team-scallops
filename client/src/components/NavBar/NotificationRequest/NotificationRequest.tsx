import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { Notification } from '../../../interface/notification/Notification';
import { Link } from 'react-router-dom';
import { setUnreadNotificationToRead } from '../../../helpers/APICalls/notifications';
import { format, compareAsc } from 'date-fns';
interface IProps {
  notification: Notification;
}

const NotificationRequest: React.FC<IProps> = ({
  notification: { _id, type, createdAt, name, image },
}): JSX.Element => {
  const classes = useStyles();

  const changeUnreadToRead = () => {
    setUnreadNotificationToRead(_id);
  };
  // console.log(format(createdAt, 'MM/dd/yyyy'));
  return (
    <Box display="flex" alignItems="center" m={2}>
      <Avatar variant="square" src={`/${image}`} className={classes.large} />
      <Box>
        <Link onClick={changeUnreadToRead} to={type === 'Service' ? '/my-sitters' : '/messages'}>
          <Typography variant="h6" className={classes.bold}>
            {/* TODO add request time  */}
            {`${name}`} has requested your service for hours
          </Typography>
        </Link>
        <Typography className={` ${classes.bold} ${classes.opacity}`}></Typography>
        <Typography variant="h6" className={classes.bold}>
          {`${createdAt}`}
        </Typography>
      </Box>
    </Box>
  );
};
export default NotificationRequest;
