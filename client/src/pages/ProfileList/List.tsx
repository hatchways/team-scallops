import { Grid, Paper, Typography, Box, Card } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';

//import useStyles from '../useStyles';

export default function List(): JSX.Element {
  const [state, setState] = useState({
    profiles: [],
  });

  useEffect(() => {
    async function fetchProfile() {
      await axios.get('/profile/all').then((response: any) => {
        return setState(response.data.profiles);
      });
    }
    fetchProfile();
  }, []);
  const profiles = state.profiles;
  return (
    <Box>
      {profiles &&
        profiles.map((profile, key) => {
          return (
            <Box key={key}>
              <Typography>This</Typography>
              <Typography>{profile}</Typography>
            </Box>
          );
        })}
    </Box>
  );
}
