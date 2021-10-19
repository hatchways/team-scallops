import { Box, Button } from '@material-ui/core';
import { useStyles } from './useStyles';
import { IUploadFile } from '../../interface/UploadFileButton';

export default function UploadFileButton({ ...inputProps }: IUploadFile): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <input className={classes.input} {...inputProps} />
      <label htmlFor={inputProps.id}>
        <Button className={classes.padding2} variant="outlined" color="secondary" component="span">
          {inputProps.text}
        </Button>
      </label>
    </Box>
  );
}
