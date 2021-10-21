import { Box, Button } from '@material-ui/core';
import { useStyles } from './useStyles';
import { IUploadFile } from '../../interface/UploadFileButton';
import { ChangeEvent, useState } from 'react';
import { uploadImage } from '../../helpers/APICalls/uploadImg';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function UploadFileButton({ ...inputProps }: IUploadFile): JSX.Element {
  const classes = useStyles();
  const URL = 'https://api.cloudinary.com/v1_1/dog-sitter/image/upload';
  const [image, setImage] = useState<File | undefined>(undefined);
  const { updateSnackBarImage } = useSnackBar();

  const onChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      setImage(file);
      uploadImage(URL, image).then((data: any) => updateSnackBarImage(data.secure_url));
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
