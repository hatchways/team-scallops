import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './useStyles';
import { Formik, FormikHelpers } from 'formik';

interface Props {
  handleSubmit: (
    {
      where,
      dropIn,
      dropOff,
    }: {
      where: string;
      dropIn: string;
      dropOff: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      where: string;
      dropIn: string;
      dropOff: string;
    }>,
  ) => void;
}

export default function LandingPage(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = (
    { where, dropIn, dropOff }: { where: string; dropIn: string; dropOff: string },
    { setSubmitting }: FormikHelpers<{ where: string; dropIn: string; dropOff: string }>,
  ): void => {
    setSubmitting(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={6} component={Paper}>
        <Box className={classes.paper}>
          <Typography className={classes.fontBold} variant="h2">
            Find the care your dog deserves
          </Typography>
          <Formik initialValues={{ where: '', dropIn: '', dropOff: '' }} onSubmit={handleSubmit}>
            {({ handleChange, values }) => (
              <form className={classes.form} noValidate>
                <TextField
                  id="outlined-full-width"
                  label="Where"
                  placeholder="Anywhere"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={values.where}
                  onChange={handleChange}
                  name="where"
                />
                <TextField
                  className={classes.width50}
                  id="outlined-full-width"
                  label="Drop in"
                  placeholder="mm/dd/yyyy"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={values.dropIn}
                  onChange={handleChange}
                  name="dropIn"
                />
                <TextField
                  className={classes.width50}
                  id="outlined-full-width"
                  label="Drop off"
                  placeholder="mm/dd/yyyy"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={values.dropOff}
                  onChange={handleChange}
                  name="dropOff"
                />

                <Button type="submit" variant="contained" color="secondary" className={classes.submit}>
                  FIND MY DOG SITTER
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
    </Grid>
  );
}
