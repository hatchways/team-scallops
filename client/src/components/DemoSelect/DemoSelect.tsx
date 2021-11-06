import { Chip, Divider, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import PetsIcon from '@material-ui/icons/Pets';
import HouseIcon from '@material-ui/icons/House';

interface Props {
  label: string;
  user: ({ username, email, password }: { username: string; email: string; password: string }) => void;
}

interface DemoUser {
  username: string;
  email: string;
  password: string;
}

const mockOwnerUser = {
  username: 'Dog Owner Demo',
  email: 'dogownerdemo@gmail.com',
  password: 'dogownerdemo',
};

const mockSitterUser = {
  username: 'Dog Sitter Demo',
  email: 'dogsitterdemo@gmail.com',
  password: 'dogsitterdemo',
};

function Demo({ label, user }: Props): JSX.Element {
  const classes = useStyles();

  function setUserDemo({ username, email, password }: DemoUser) {
    user({ username, email, password });
  }

  return (
    <>
      <Divider variant="middle" />
      <Typography className={classes.header} align="center" color="textPrimary">
        {label}
      </Typography>
      <Chip label="Owner" icon={<PetsIcon />} onClick={() => setUserDemo(mockOwnerUser)} className={classes.demo} />
      <Chip label="Sitter" icon={<HouseIcon />} onClick={() => setUserDemo(mockSitterUser)} className={classes.demo} />
    </>
  );
}

export default Demo;
