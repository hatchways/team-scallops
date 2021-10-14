import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Box, Button } from '@material-ui/core';
import { useStyles } from './useStyles';
import UploadFileButton from '../UploadFileButton/UploadFileButton';

export default function UploadPhoto(): JSX.Element {
  const classes = useStyles();

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
        <CardMedia className={classes.media} image="/1.jpeg" title="User-Image" />
        <Typography className={`${classes.opacity} ${classes.width12}`}>
          Be sure to use a photo that clearly shows your face
        </Typography>

        <UploadFileButton
          id="uploadImage"
          accept="image/*"
          type="file"
          name="images"
          text="Upload a file from your device"
        />
        <Button startIcon={<DeleteIcon />}>Delete Photo</Button>
      </Box>
    </Card>
  );
}
