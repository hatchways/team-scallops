import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Menu, MenuItem } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './useStyles';
import { Review } from '../../interface/Reviews';
import { useState } from 'react';
import { ReportTwoTone } from '@material-ui/icons';
import moment from 'moment';

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props): JSX.Element {
  const classes = useStyles();
  const [optionsMenuAnchorEl, setoptionsMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isProfileMenuOpen = Boolean(optionsMenuAnchorEl);

  const { reviewerProfileId } = review;

  const handleOptionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setoptionsMenuAnchorEl(event.currentTarget);
  };

  const handleOptionsMenuClose = () => {
    setoptionsMenuAnchorEl(null);
  };

  const optionsMenuId = 'options-menu';
  const renderOptionsMenu = (
    <Menu
      anchorEl={optionsMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={optionsMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleOptionsMenuClose}
    >
      <MenuItem onClick={handleOptionsMenuClose}>
        <IconButton style={{ padding: '0 1px 0 0', opacity: '.5' }} aria-label="show 4 new mails" color="inherit">
          <ReportTwoTone />
        </IconButton>
        <p style={{ margin: 0 }}>Report</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Card elevation={2} className={classes.root}>
      <CardHeader
        className={classes.header}
        // avatar={<Avatar src={reviewerProfileId.avatar} alt="Profile Image" aria-label="profile image" />}
        action={
          <IconButton onClick={handleOptionsMenuOpen} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={reviewerProfileId.firstName}
        subheader={moment(review.updatedAt).fromNow()}
      />
      <CardContent className={classes.content}>
        <Rating name="user rating" value={review.starRating} readOnly />
        <Typography variant="body2" component="p">
          {review.text}
        </Typography>
      </CardContent>
      {renderOptionsMenu}
    </Card>
  );
}
