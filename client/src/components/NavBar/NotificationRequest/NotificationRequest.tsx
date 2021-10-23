import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
interface IProps {
  user: IUser;
}
interface IUser {
  name: string;
  date: string;
  serviceType: string;
  time: string;
  image: string;
}
const NotificationRequest: React.FC<IProps> = ({ user: { name, date, serviceType, image, time } }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Avatar variant="square" src={`/${image}`} className={classes.large} />
      <Box>
        <Typography variant="h6" className={classes.bold}>
          {`${name}`} has requested your service for {`${time}`} hours
        </Typography>
        <Typography className={` ${classes.bold} ${classes.opacity}`}> {`${serviceType}`}</Typography>
        <Typography variant="h6" className={classes.bold}>
          {`${date}`}
        </Typography>
      </Box>
    </Box>
  );
};
export default NotificationRequest;
