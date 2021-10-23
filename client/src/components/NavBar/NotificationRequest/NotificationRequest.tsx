import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { Notification } from '../../../interface/Notification';
interface IProps {
  notification: Notification;
}

const NotificationRequest: React.FC<IProps> = ({
  notification: { type, title, message, created_at, isRead, sender },
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Avatar variant="square" src={`/${isRead}`} className={classes.large} />
      <Box>
        <Typography variant="h6" className={classes.bold}>
          {`${title}`} has requested your service for hours
        </Typography>
        <Typography className={` ${classes.bold} ${classes.opacity}`}> </Typography>
        <Typography variant="h6" className={classes.bold}>
          {`${created_at}`}
        </Typography>
      </Box>
    </Box>
  );
};
export default NotificationRequest;
