import { useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  ImageListItem,
  ImageList,
  Typography,
  CardActionArea,
  CircularProgress,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';

import { TimePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import dog from '../../images/shiba-inu.jpeg';
import house from '../../images/house.jpeg';
import person from '../../images/woman-green-jacket.png';
import useStyles from './useStyles';
import { useParams } from 'react-router-dom';
import { Profile } from '../../interface/Profile';
import { getSitterProfile } from '../../helpers/APICalls/profile';
import { format, formatISO, parseISO } from 'date-fns';
import { createRequest } from '../../helpers/APICalls/requests';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useSnackBar } from '../../context/useSnackbarContext';
import postConversations from '../../helpers/APICalls/postConversation';

interface ParamsProps {
  id: string;
}

interface DatesRequest {
  dropInDate: Date;
  dropInTime: Date;
  dropOffDate: Date;
  dropOffTime: Date;
}

const today = new Date();
const nextDay = new Date(today);
nextDay.setDate(nextDay.getDate() + 1);

function SitterDetails(): JSX.Element {
  const classes = useStyles();
  const { id: selectedSitterId }: ParamsProps = useParams();

  const [sitterDetails, setSitterDetails] = useState<Profile>();

  function convertToDateTime(date: number | Date, time: number | Date) {
    const dateStr = formatISO(date, { representation: 'date' });
    const timeStr = formatISO(time, { representation: 'time' });

    const dateAndTime = `${dateStr}T${timeStr}`;
    const newDate = parseISO(dateAndTime);

    return newDate;
  }

  useEffect(() => {
    async function getSitterDetails() {
      const sitterProfile = await getSitterProfile(selectedSitterId);
      setSitterDetails(sitterProfile);
    }
    getSitterDetails();
  }, [selectedSitterId]);

  const profile = sitterDetails?.profile;

  const { updateSnackBarMessage } = useSnackBar();
  const handleSubmit = (
    { dropInDate, dropInTime, dropOffDate, dropOffTime }: DatesRequest,
    { setSubmitting }: FormikHelpers<DatesRequest>,
  ) => {
    const startDate = convertToDateTime(dropInDate, dropInTime);
    const endDate = convertToDateTime(dropOffDate, dropOffTime);
    const selectedUserSitterId = profile?.user || '';

    createRequest(selectedUserSitterId, startDate, endDate, 'WALKING', 14).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        updateSnackBarMessage('Please log in and try again!');
      } else if (data.request) {
        postConversations(selectedUserSitterId);
        updateSnackBarMessage('Your request was sent, please wait for the sitter to accept it.');
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
      setSubmitting(false);
    });
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
          <Card>
            <CardActionArea className={classes.media}>
              {/* TODO: Add coverPhoto and profilePhoto to the Profile Model, adjust to profile?.coverPhoto and profile?.profilePhoto accordingly. */}
              <CardMedia className={classes.coverPhoto} image={house} title="Contemplative Reptile" />
              <Avatar aria-label="sitter-photo" alt="Person" src={person} className={classes.profilePhoto} />
            </CardActionArea>
            <CardContent className={classes.profileDetail}>
              <Typography gutterBottom variant="h5" align="center">
                {`${profile?.firstName} ${profile?.lastName}`}
              </Typography>
              {profile?.birthday && (
                <Typography paragraph variant="body1" color="textSecondary" align="center">
                  {format(new Date(profile?.birthday), 'd MMMM')}
                </Typography>
              )}
              <Typography variant="body1" color="textSecondary" align="center">
                <LocationOnIcon color="secondary" className={classes.locationIcon} />
                {profile?.address}
              </Typography>
              <Typography gutterBottom variant="h6" className={classes.title}>
                About me
              </Typography>
              <Typography paragraph variant="body1" color="textPrimary">
                {profile?.description}
              </Typography>
              <ImageList rowHeight={160} cols={4}>
                {/* TODO: Add albumPhotos to the Profile Model. */}
                <ImageListItem cols={1}>
                  <img src={dog} alt="dog" />
                </ImageListItem>
              </ImageList>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className={classes.request}>
            <Box>
              {/* TODO: Add rate to the Profile Model, adjust to profile.rate. */}
              <Typography variant="h6" align="center" className={classes.title}>
                $14/hr
              </Typography>
              {/* TODO: Create Rating Model and add the value. */}
              <Rating name="size-large" defaultValue={4} size="large" className={classes.rating} readOnly />
            </Box>
            <Formik
              initialValues={{
                dropInDate: today,
                dropInTime: today,
                dropOffDate: nextDay,
                dropOffTime: nextDay,
              }}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, values, isSubmitting, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <Box className={classes.datesBox}>
                    <Typography className={classes.datesTitle}>drop in</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        disablePast
                        variant="inline"
                        inputVariant="outlined"
                        format="dd MMMM yyyy"
                        value={values.dropInDate}
                        InputAdornmentProps={{ position: 'start' }}
                        onChange={(date: MaterialUiPickersDate) => setFieldValue('dropInDate', date)}
                      />
                      <TimePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        value={values.dropInTime}
                        onChange={(time: MaterialUiPickersDate) => setFieldValue('dropInTime', time)}
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
                        value={values.dropOffDate}
                        InputAdornmentProps={{ position: 'start' }}
                        onChange={(date: MaterialUiPickersDate) => setFieldValue('dropOffDate', date)}
                      />
                      <TimePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        value={values.dropOffTime}
                        onChange={(time: MaterialUiPickersDate) => setFieldValue('dropOffTime', time)}
                      />
                    </MuiPickersUtilsProvider>
                  </Box>
                  <Box className={classes.actionsBox}>
                    <Button type="submit" variant="contained" color="secondary" className={classes.actions}>
                      {isSubmitting ? <CircularProgress /> : 'send request'}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default SitterDetails;
