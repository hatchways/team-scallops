import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress, InputLabel } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

interface Props {
  handleSubmit: (
    {
      username,
      email,
      password,
    }: {
      email: string;
      password: string;
      username: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      username: string;
    }>,
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required').max(40, 'Username is too long'),
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <InputLabel htmlFor="username">
            <Typography className={classes.label} color="textPrimary">
              name
            </Typography>
          </InputLabel>
          <TextField
            id="username"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="username"
            autoComplete="username"
            autoFocus
            helperText={touched.username ? errors.username : ''}
            error={touched.username && Boolean(errors.username)}
            value={values.username}
            placeholder="Your name"
            variant="outlined"
            onChange={handleChange}
          />
          <InputLabel htmlFor="email">
            <Typography className={classes.label} color="textPrimary">
              email address
            </Typography>
          </InputLabel>
          <TextField
            id="email"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="email"
            autoComplete="email"
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            placeholder="Your email"
            variant="outlined"
            onChange={handleChange}
          />
          <InputLabel htmlFor="password">
            <Typography className={classes.label} color="textPrimary">
              password
            </Typography>
          </InputLabel>
          <TextField
            id="password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            placeholder="Create a password"
            variant="outlined"
            onChange={handleChange}
          />

          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="secondary" className={classes.submit}>
              {isSubmitting ? <CircularProgress className={classes.circleColor} /> : 'Create'}
            </Button>
          </Box>
          <Box mt={3} display="flex" textAlign="center" alignItems="center" justifyContent="center">
            <Typography className={classes.boldText} color="textPrimary">
              Already a member?&nbsp;
            </Typography>
            <NavLink to="/login" color="secondary">
              <Typography color="secondary">Login</Typography>
            </NavLink>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
