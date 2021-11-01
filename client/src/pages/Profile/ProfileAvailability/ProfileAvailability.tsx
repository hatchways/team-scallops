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

import useStyles from './useStyles';

function ProfileAvailability(): JSX.Element {
  const classes = useStyles();

  const today = new Date();
  const [hidden, setHidden] = useState(true);
  const [selection, setSelection] = useState<Range>({
    startDate: today,
    endDate: today,
    key: 'selection',
  });

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const from = selection.startDate ?? today;
  const to = selection.endDate ?? today;

  const handleSelect = (ranges: RangeKeyDict) => {
    // props.handleSelect(ranges);
    setSelection(ranges);
  };

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
      <Box display="inline" className={classes.datePicker}>
        {!hidden && (
          <Paper>
            <DateRange onChange={handleSelect} minDate={new Date()} ranges={[selection]} />
          </Paper>
        )}
      </Box>
      <Card variant="outlined">
        <Box className={classes.content}>
          <Switch
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
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
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
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
