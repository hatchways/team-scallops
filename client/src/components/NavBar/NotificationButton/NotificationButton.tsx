import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useSyles';
import { Box } from '@material-ui/core';
import NotificationRequest from '../NotificationRequest/NotificationRequest';

export default function NotificationButton() {
  const testProps = [
    {
      name: 'Mary',
      time: '2',
      serviceType: 'Dog Sitter',
      date: ' 09/09/2019',
      image: '1.jpeg',
    },
    {
      name: 'Joe',
      time: '12',
      serviceType: 'Dog Sitter',
      date: ' 09/10/2020',
      image: '2.jpeg',
    },
  ];
  interface Props {
    name: string;
    date: string;
    serviceType: string;
    time: string;
    image: string;
  }
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
          {testProps.map((user, i) => (
            <NotificationRequest user={user} key={i} />
          ))}
        </Typography>
      </Popover>
    </Box>
  );
}
