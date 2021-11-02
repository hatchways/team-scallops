import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Icon,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/CalendarToday';
import SaveIcon from '@material-ui/icons/Save';

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

  const [availability, setAvailability] = useState(false);

  const from = selection.startDate ?? today;
  const to = selection.endDate ?? nextDay;

  return (
    <Grid className={classes.root}>
      <Typography align="center" variant="h4" className={classes.dayText}>
        Your availability
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
        <Box className={classes.content}>
          <Switch
            checked={availability}
            onChange={() => setAvailability(!availability)}
            name="availability"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <Typography variant="h6" className={classes.dayText}>
            17 June,
            <Typography color="textSecondary" display="inline">
              {' '}
              Monday
            </Typography>
          </Typography>
          <CardContent className={classes.time}>
            <Typography className={classes.text}>From</Typography>
            <TextField
              id="time"
              type="time"
              defaultValue="07:30"
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
              defaultValue="07:30"
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
        <Box className={classes.content}>
          <Switch
            checked={availability}
            onChange={() => setAvailability(!availability)}
            name="availability"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <Typography variant="h6" className={classes.dayText}>
            17 June,
            <Typography color="textSecondary" display="inline">
              {' '}
              Monday
            </Typography>
          </Typography>
          <CardContent className={classes.time}>
            <Typography className={classes.text}>From</Typography>
            <TextField
              id="time"
              type="time"
              defaultValue="07:30"
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
              defaultValue="07:30"
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
      </Card>
    </Grid>
  );
}

export default ProfileAvailability;
