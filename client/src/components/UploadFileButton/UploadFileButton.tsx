import { Box, Button } from '@material-ui/core';
import { useStyles } from './useStyles';
import { IUploadFile } from '../../interface/UploadFileButton';
import { ChangeEvent } from 'react';
import { uploadImage } from '../../helpers/APICalls/uploadImg';
import { useSnackBar } from '../../context/useSnackbarContext';
export default function UploadFileButton({ ...inputProps }: IUploadFile): JSX.Element {
  const classes = useStyles();
  const URL = 'https://api.cloudinary.com/v1_1/dog-sitter/image/upload';

  const { updateSnackBarMessage } = useSnackBar();

  const onChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      uploadImage(URL, file)
        .then((data: string) => {
          updateSnackBarMessage('Image has been successfully uploaded');
        })
        .catch((err) => updateSnackBarMessage(err.message));
    }
  };
  return (
    <Box>
      <input className={classes.input} {...inputProps} onChange={onChange} />
      <label htmlFor={inputProps.id}>
        <Button className={classes.padding2} variant="outlined" color="secondary" component="span">
          {inputProps.text}
        </Button>
      </label>
    </Box>
  );
}
