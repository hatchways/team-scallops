import { useState, MouseEvent } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useSyles';
import { Box } from '@material-ui/core';
import NotificationRequest from '../NotificationRequest/NotificationRequest';
import { useNotification } from '../../../context/useNotificationContext';
import { StyledBadge } from './useSyles';

export default function NotificationButton(): JSX.Element {
  const [isReadNotification, setIsReadNotification] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const classes = useStyles();
  const { unReadNotifications } = useNotification();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsReadNotification(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box>
      <Button aria-describedby={id} onClick={handleClick} className={classes.menuBarButton}>
        <StyledBadge variant="dot" invisible={isReadNotification}>
          <Typography variant="h6" color="textPrimary" className={` ${classes.mobileView}`}>
            Notifications
          </Typography>
        </StyledBadge>
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
        style={{ position: 'absolute', top: '4rem' }}
      >
        {unReadNotifications?.map((notification) => (
          <NotificationRequest notification={notification} key={notification._id} />
        ))}
      </Popover>
    </Box>
  );
}
