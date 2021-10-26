import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  image: {
    backgroundImage: 'url(/33.jpeg)',
    backgroundRepeat: 'no-repeat',
    // backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flexStart',
  },

  form: {
    width: '70%',
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2, 6),
    background: '#f54242',
  },
  fontBold: {
    fontWeight: 'bold',
  },
  width50: {
    width: '50%',
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={0} square>
        <Box className={classes.paper}>
          <Typography className={classes.fontBold} variant="h2">
            Find the care your dog deserves
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              id="outlined-full-width"
              label="Where"
              placeholder="Anywhere"
              //helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              className={classes.width50}
              id="outlined-full-width"
              label="Drop in"
              placeholder="mm/dd/yyyy"
              //helperText="Full width!"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              className={classes.width50}
              id="outlined-full-width"
              label="Drop off"
              placeholder="mm/dd/yyyy"
              //helperText="Full width!"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />

            <Button type="submit" variant="contained" color="secondary" className={classes.submit}>
              FIND MY DOG SITTER
            </Button>

            <Box mt={5}></Box>
          </form>
        </Box>
      </Grid>
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
    </Grid>
  );
}
