import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    register(username, email, password).then((data) => {
      if (data.error) {
        const error = data.error as unknown as string;
        console.error({ error });
        setSubmitting(false);
        updateSnackBarMessage(error);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root} justify="center" alignItems="center">
      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} className={classes.wrapper}>
        <Box width="100%" maxWidth={450} p={3} mt={5}>
          <Grid container justify="center" alignItems="center">
            <Typography className={classes.title} color="textPrimary">
              Sign Up
            </Typography>
          </Grid>
          <SignUpForm handleSubmit={handleSubmit} />
        </Box>
      </Grid>
    </Grid>
  );
}
