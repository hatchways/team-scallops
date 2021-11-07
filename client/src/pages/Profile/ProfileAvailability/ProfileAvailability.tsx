import { useEffect, useState } from 'react';
import { format, getDate, getDay, getMonth } from 'date-fns';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Box, Button, Card, CardContent, Divider, Grid, Icon, Switch, TextField, Typography } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/CalendarToday';
import SaveIcon from '@material-ui/icons/Save';
import { eachDayOfInterval } from 'date-fns/esm';
import { getUserProfile, updateProfile } from '../../../helpers/APICalls/profile';
import { AvailabilityInDays, Profile } from '../../../interface/Profile';
import { Days, Months } from '../../../lib/constants/dates';

import useStyles from './useStyles';

function ProfileAvailability(): JSX.Element {
  const classes = useStyles();

  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 1);

  const [hidden, setHidden] = useState(true);
  const [selection, setSelection] = useState<Range>({
    startDate: today,
    endDate: nextDay,
    key: 'rollup',
  });

  const [availability, setAvailability] = useState<AvailabilityInDays>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    async function getSitterAvailability() {
      const userProfile = await getUserProfile();

      if (userProfile.profile.availability !== null) {
        setAvailability(userProfile.profile.availability);
        setProfile(userProfile);
      }
    }
    getSitterAvailability();
  }, []);

  useEffect(() => {
    async function updateSitterAvailability() {
      if (profile) {
        profile.profile.availability = availability;
        setProfile(profile);
        await updateProfile(profile);
      }
    }
    updateSitterAvailability();
  }, [profile, availability]);

  const from = selection.startDate ?? today;
  const to = selection.endDate ?? nextDay;

  const intervalOfDays = eachDayOfInterval({ start: from, end: to });

  function getChecked(day: Date) {
    const weekDay = Days[getDay(day)].toLowerCase() as keyof AvailabilityInDays;
    const checked = availability[weekDay];
    return checked;
  }

  function handleAvailibility(day: Date): void {
    const weekDay = Days[getDay(day)].toLowerCase() as keyof AvailabilityInDays;
    setAvailability((prev) => ({
      ...prev,
      [weekDay]: !availability[weekDay],
    }));
  }

  return (
    <Grid direction="column" className={classes.root}>
      <Typography align="center" variant="h4" className={classes.dayText}>
        your availability
      </Typography>
      <Box display="inline" className={classes.availability}>
        <Icon color="secondary">
          <DateRangeIcon />
        </Icon>
        <Button onClick={() => setHidden(!hidden)} className={classes.dateRange}>{`
              ${format(from, 'dd-')}${`${format(to, 'dd MMMM yyyy')}`}`}</Button>
      </Box>
      {!hidden && (
        <Box display="inline" className={classes.datePicker}>
          <DateRange
            startDatePlaceholder="Start Date"
            endDatePlaceholder="End Date"
            onChange={(ranges) => setSelection(ranges.rollup)}
            minDate={new Date()}
            ranges={[selection]}
          />
          <Button variant="contained" size="small" startIcon={<SaveIcon />} onClick={() => setHidden(!hidden)}>
            Save
          </Button>
        </Box>
      )}
      <Card variant="outlined">
        {availability &&
          intervalOfDays?.map((day, index) => (
            <>
              <Box className={classes.content} key={`${day} ${index}`}>
                <Switch
                  checked={getChecked(day)}
                  onChange={() => handleAvailibility(day)}
                  name="availability"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <Typography variant="h6" className={classes.dayText}>
                  {`${getDate(day)} ${Months[getMonth(day)]},`}
                  <Typography color="textSecondary" display="inline">
                    {Days[getDay(day)]}
                  </Typography>
                </Typography>
                <CardContent className={classes.time}>
                  <Typography className={classes.text}>From</Typography>
                  <TextField
                    id="time"
                    type="time"
                    defaultValue="09:00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    variant="outlined"
                    className={classes.textField}
                  />
                  <Typography className={classes.text}>To</Typography>
                  <TextField
                    id="time"
                    type="time"
                    defaultValue="18:00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    variant="outlined"
                    className={classes.textField}
                  />
                </CardContent>
              </Box>
              <Divider />
            </>
          ))}
      </Card>
    </Grid>
  );
}

export default ProfileAvailability;
