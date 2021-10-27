import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './useStyles';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputField/InputField';

export default function LandingPage(): JSX.Element {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const classes = useStyles();

  const handleSubmit = (
    { where, dropIn, dropOff }: { where: string; dropIn: string; dropOff: string },
    { setSubmitting }: FormikHelpers<{ where: string; dropIn: string; dropOff: string }>,
  ): void => {
    //TODO here we have all user inputs values(where,dropIn,dropOff) and ready to make a req to server
    setSubmitting(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={0}>
        <Box className={classes.paper}>
          <Typography className={classes.fontBold} variant="h2">
            Find the care your dog deserves
          </Typography>
          <Formik
            initialValues={{ where: '', dropIn: '', dropOff: '' }}
            validationSchema={Yup.object().shape({
              where: Yup.string().required('Where is required'),
              dropIn: Yup.date().min(today, 'Drop in cannot be in the past').required(''),
              dropOff: Yup.date().when(
                'dropIn',
                (dropIn: string, schema: any) =>
                  dropIn && schema.min(dropIn, 'Drop off date must be greater than Drop in.'),
              ),
            })}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <InputField
                  name="where"
                  type="text"
                  id="where"
                  label="Where"
                  placeholder="Anywhere"
                  helperText={touched.where ? errors.where : ''}
                  error={touched.where && Boolean(errors.where)}
                  variant="outlined"
                  value={values.where}
                  handleChange={handleChange}
                />
                <Box display="flex">
                  <InputField
                    name="dropIn"
                    type="date"
                    id="outlined-full-width"
                    label="Drop In"
                    placeholder="mm/dd/yyyy"
                    helperText={touched.dropIn ? errors.dropIn : ''}
                    error={touched.dropIn && Boolean(errors.dropIn)}
                    variant="outlined"
                    value={values.dropIn}
                    handleChange={handleChange}
                  />
                  <InputField
                    name="dropOff"
                    type="date"
                    id="outlined-full-width"
                    label="Drop Off"
                    placeholder="mm/dd/yyyy"
                    helperText={touched.dropOff ? errors.dropOff : ''}
                    error={touched.dropOff && Boolean(errors.dropOff)}
                    variant="outlined"
                    value={values.dropOff}
                    handleChange={handleChange}
                  />
                </Box>

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
