import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { Notification } from '../../../interface/notification/Notification';
import { Link } from 'react-router-dom';
interface IProps {
  notification: Notification;
}

const NotificationRequest: React.FC<IProps> = ({
  notification: { type, createdAt, name, image, service },
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" m={2}>
      <Avatar variant="square" src={`/${image}`} className={classes.large} />
      <Box>
        <Link to={type === 'Service' ? '/my-sitters' : '/messages'}>
          <Typography variant="h6" className={classes.bold}>
            {/* TODO add request time  */}
            {`${name}`} has requested your service for hours
          </Typography>
        </Link>
        <Typography className={` ${classes.bold} ${classes.opacity}`}> {`${service}`}</Typography>
        <Typography variant="h6" className={classes.bold}>
          {`${createdAt}`}
        </Typography>
      </Box>
    </Box>
  );
};
export default NotificationRequest;
