import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      marginRight: '1rem',
    },
    bold: {
      fontWeight: 'bold',
    },
    opacity: {
      opacity: 0.5,
    },
  }),
);
export default useStyles;
