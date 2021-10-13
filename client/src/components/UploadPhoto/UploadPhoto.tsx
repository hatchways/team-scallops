import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Box, Button } from '@material-ui/core';
import { useStyles } from './useStyles';

export default function RecipeReviewCard() {
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
        <CardMedia className={classes.media} image="/1.jpeg" title="Paella dish" />
        <Typography className={`${classes.opacity} ${classes.width12}`}>
          Be sure to use a photo that clearly shows your face
        </Typography>
        {/* TODO I added 'name=images' att to input which shoud match the name in config Multer package   */}
        <input
          className={classes.input}
          id="contained-button-file"
          accept="image/*"
          multiple
          type="file"
          name="images"
        />
        <label htmlFor="contained-button-file">
          <Button variant="outlined" color="secondary" component="span" className={classes.padding2}>
            Upload a file from your device
          </Button>
        </label>
        <Box display="flex">
          <DeleteForeverIcon className={classes.mr1} />
          <Typography className={`${classes.opacity} ${classes.fontWeight900}`}> Delete photo</Typography>
        </Box>
      </Box>
    </Card>
  );
}
