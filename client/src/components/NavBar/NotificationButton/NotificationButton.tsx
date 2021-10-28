import { useState, MouseEvent } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useSyles';
import { Badge, Box } from '@material-ui/core';
import NotificationRequest from '../NotificationRequest/NotificationRequest';
import { useNotification } from '../../../context/useNotificationContext';
import { setUnreadNotificationToRead } from '../../../helpers/APICalls/notifications';
const testNotifi = [
  {
    id: '123',
    type: 'message',
    isRead: false,
    sender: '12265eu56eutr',
    title: '',
    message: '',
    created_at: '2/3/2020',
    image: '1.jpeg',
    name: 'Mary',
    service: 'Dag owner',
  },
  {
    id: '1234cc',
    type: 'Service',
    isRead: false,
    sender: '98u098y7yt07t7',
    title: '',
    message: '',
    created_at: '2/3/2020',
    image: '2.jpeg',
    name: 'Joe',
    service: 'Dag Sitter',
  },
];

export default function NotificationButton(): JSX.Element {
  const [isReadNotification, setIsReadNotification] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const classes = useStyles();
  const { unReadNotifications } = useNotification();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsReadNotification(true);
    changeUnreadToRead();
  };
  const changeUnreadToRead = () => {
    unReadNotifications?.map((notification) => setUnreadNotificationToRead(notification.id));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Button aria-describedby={id} onClick={handleClick} className={classes.menuBarButton}>
        <Badge color="primary" variant="dot" invisible={isReadNotification}>
          <Typography variant="h6" color="textPrimary" className={` ${classes.mobileView}`}>
            Notifications
          </Typography>
        </Badge>
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
        style={{ position: 'absolute', top: '3rem' }}
      >
        {testNotifi.map((notification, index) => (
          <NotificationRequest notification={notification} key={index} />
        ))}
      </Popover>
    </Box>
  );
}
