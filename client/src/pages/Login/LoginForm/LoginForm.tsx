import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress, InputLabel } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Demo from '../../../components/DemoSelect/DemoSelect';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function Login({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  const [demoUser, setDemoUser] = useState<Record<string, string> | undefined>();

  function getDemoUser({ username, email, password }: { username: string; email: string; password: string }) {
    setDemoUser({ username, email, password });
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        email: demoUser?.email ?? '',
        password: demoUser?.password ?? '',
      }}
      validationSchema={Yup.object().shape({
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
          <InputLabel htmlFor="email">
            <Typography className={classes.label} color="textPrimary">
              e-mail address
            </Typography>
          </InputLabel>
          <TextField
            id="email"
            placeholder="Your email"
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
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
            variant="outlined"
          />
          <InputLabel htmlFor="password">
            <Typography className={classes.label} color="textPrimary">
              password
            </Typography>
          </InputLabel>
          <TextField
            id="password"
            placeholder="Password"
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
            onChange={handleChange}
            variant="outlined"
          />
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="secondary" className={classes.submit}>
              {isSubmitting ? <CircularProgress className={classes.circleColor} /> : 'Login'}
            </Button>
            <Demo label={'Log in as a demo user'} user={getDemoUser} />
          </Box>
          <Box mt={3} textAlign="center" alignItems="center" justifyContent="center">
            <Typography className={classes.boldText}> {"Don't have account? "}</Typography>
            <NavLink to="/signup" color="secondary">
              <Typography color="secondary">Create an account</Typography>
            </NavLink>
          </Box>
        </form>
      )}
    </Formik>
  );
}
