import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function UnauthorizedError(): JSX.Element {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>Authorization Required</strong>
    </Alert>
  );
}

export default UnauthorizedError;
