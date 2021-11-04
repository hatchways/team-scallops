import { Box, Switch, Typography, Grid, Divider, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import axios from 'axios';

export default function SitterSignup(): JSX.Element {
  const history = useHistory();
  const loggedInUser = useAuth();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function getUser() {
      await axios.get('/users/isSitter/').then((response: any) => {
        if (response.data.isSitter) {
          setChecked(response.data.isSitter);
        }
      });
    }
    getUser();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    async function updateIsSitter() {
      await axios.patch('/users/isSitter/', { isSitter: checked });
    }
    updateIsSitter();
    setChecked(checked);

    console.log(loggedInUser);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant={'h5'}>
          Pet sitters play an important role in our community. Pets need friends to love while their owners are away!{' '}
        </Typography>
        <Typography variant={'h6'}>Toggle this to become a pet sitter today!</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Typography>
          <Switch onChange={handleChange} checked={checked} />
          Pet sitter toggle
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {checked && (
          <Box>
            <Typography variant={'h6'}>
              You are NOW signed up as a pet Sitter. Please fill out your profile so you may be contacted by people
              requiring your services!
              <Typography>
                <Link to="/profile/edit">Edit your profile here!</Link>
              </Typography>
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
