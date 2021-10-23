import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useSyles';
import { Box } from '@material-ui/core';
import NotificationRequest from '../NotificationRequest/NotificationRequest';
import getUnreadNotifications from '../../../helpers/APICalls/getUnreadNotifications';
import { Notification } from '../../../interface/Notification';
export default function NotificationButton() {
  const [unReadNotifications, setUnReadNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    getUnreadNotifications().then((data) => 'done');
  }, []);
  const testNotifi = [
    {
      id: '123',
      type: 'message',
      isRead: false,
      sender: '12265eu56eutr',
      title: 'hello',
      message: 'waht',
      created_at: '2/3/2020',
    },
    {
      id: '123',
      type: 'message',
      isRead: false,
      sender: '98u098y7yt07t7',
      title: 'hello',
      message: 'waht',
      created_at: '2/3/2020',
    },
  ];

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Button aria-describedby={id} onClick={handleClick} className={classes.menuBarButton}>
        <Typography variant="h6" color="textPrimary" className={` ${classes.mobileView}`}>
          Notifications
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography
          color="textPrimary"
          className={`${classes.menuBarButton} ${classes.mobileView} ${classes.typography}`}
        >
          {testNotifi.map((notification, i) => (
            <NotificationRequest notification={notification} key={i} />
          ))}
        </Typography>
      </Popover>
    </Box>
  );
}
