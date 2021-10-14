import { Button } from '@material-ui/core';
import { useStyles } from './useStyles';
import { IUploadFile } from '../../interface/UploadFileButton';

export default function UploadFileButton({ id, accept, type, name, text }: IUploadFile): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <input className={classes.input} id={id} accept={accept} name={name} type={type} />
      <label htmlFor="uploadImage">
        <Button className={classes.padding2} variant="outlined" color="secondary" component="span">
          {text}
        </Button>
      </label>
    </div>
  );
}
