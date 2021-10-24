import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { Notification } from '../../../interface/Notification';
interface IProps {
  notification: Notification;
}

const NotificationRequest: React.FC<IProps> = ({
  notification: { type, title, message, created_at, name, image, service },
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Avatar variant="square" src={`/${image}`} className={classes.large} />
      <Box>
        <Typography variant="h6" className={classes.bold}>
          {`${name}`} has requested your service for hours {`${created_at}`}
        </Typography>
        <Typography className={` ${classes.bold} ${classes.opacity}`}> {`${service}`}</Typography>
        <Typography variant="h6" className={classes.bold}>
          {`${created_at}`}
        </Typography>
      </Box>
    </Box>
  );
};
export default NotificationRequest;
