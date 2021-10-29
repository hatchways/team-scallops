import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Box, Button } from '@material-ui/core';
import { useStyles } from './useStyles';
import UploadFileButton from '../UploadFileButton/UploadFileButton';
import Avatar from '@material-ui/core/Avatar';
import { useProfile } from '../../context/useProfileContext';

export default function UploadPhoto(): JSX.Element {
  const classes = useStyles();
  const { myProfile } = useProfile();

  return (
    <Card className={classes.root}>
      <Box
        className={classes.card}
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignContent="center"
        alignItems="center"
      >
        <Typography className={classes.fontWeight900} variant="h5">
          Profile Photo
        </Typography>

        <Avatar src={`${myProfile?.image.url}`} title="User-Image" className={classes.large} />
        <Typography className={`${classes.opacity} ${classes.width12}`}>
          Be sure to use a photo that clearly shows your face
        </Typography>

        <UploadFileButton
          id="upload-image"
          accept="image/*"
          type="file"
          name="image"
          text="Upload a file from your device"
        />
        <Button startIcon={<DeleteIcon />}>Delete Photo</Button>
      </Box>
    </Card>
  );
}
