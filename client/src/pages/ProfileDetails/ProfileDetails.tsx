import { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageList from '@material-ui/core/ImageList';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

import { TimePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';

import dog from '../../Images/shiba-inu.jpeg';
import house from '../../Images/house.jpeg';
import person from '../../Images/d9fc84a0d1d545d77e78aaad39c20c11d3355074.png';
import useStyles from './useStyles';

function ProfileDetails(): JSX.Element {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(new Date());

  const handleDateChange = (date: MaterialUiPickersDate): MaterialUiPickersDate => {
    setSelectedDate(date);
    return date;
  };
  return (
    <>
      <Grid
        container
        spacing={10}
        direction="row"
        alignContent="center"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid item xs={12} sm={7}>
          <Paper elevation={3}>
            <Box className={classes.media}>
              <CardMedia className={classes.coverPhoto} image={house} title="Contemplative Reptile" />
              <Avatar aria-label="sitter-photo" alt="Person" src={person} className={classes.profilePhoto} />
            </Box>
            <Card className={classes.profileDetail}>
              <CardContent>
                <Typography gutterBottom variant="h5" align="center">
                  Norma Byers
                </Typography>
                <Typography paragraph variant="body1" color="textSecondary" align="center">
                  Loving pet sitter
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center">
                  <LocationOnIcon color="secondary" className={classes.locationIcon} />
                  Toronto, Ontario
                </Typography>
                <Typography gutterBottom variant="h6" className={classes.title}>
                  About me
                </Typography>
                <Typography paragraph variant="body1" color="textPrimary">
                  Animals are my passion! I will look after your pets with loving care. I have some availability for pet
                  care in my home ase well. I have 10 yrs experience at the Animal Hospital, and have owned multiple
                  pets for may years, including numerous rescues. Kindly email, text or call me and I will respond
                  promptly!
                </Typography>
                <ImageList rowHeight={160} cols={4}>
                  <ImageListItem cols={1}>
                    <img src={dog} alt="dog" />
                  </ImageListItem>
                </ImageList>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper elevation={3}>
            <Card className={classes.request}>
              <Box>
                <Typography variant="h6" align="center" className={classes.title}>
                  $14/hr
                </Typography>
                <Rating name="size-large" defaultValue={4} size="large" className={classes.rating} readOnly />
              </Box>
              <Box className={classes.datesBox}>
                <Typography className={classes.datesTitle}>drop in</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disablePast
                    variant="inline"
                    inputVariant="outlined"
                    format="dd MMMM yyyy"
                    value={selectedDate}
                    InputAdornmentProps={{ position: 'start' }}
                    onChange={(date) => handleDateChange(date)}
                  />
                  <TimePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    value={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <Box className={classes.datesBox}>
                <Typography className={classes.datesTitle}>drop off</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disablePast
                    variant="inline"
                    inputVariant="outlined"
                    label=""
                    format="dd MMMM yyyy"
                    value={selectedDate}
                    InputAdornmentProps={{ position: 'start' }}
                    onChange={(date) => handleDateChange(date)}
                  />
                  <TimePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    value={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <Box className={classes.actionsBox}>
                <Button variant="contained" color="secondary" className={classes.actions}>
                  send request
                </Button>
              </Box>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileDetails;
