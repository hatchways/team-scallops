import { Box, Button } from '@material-ui/core';
import { useStyles } from './useStyles';
import { IUploadFile } from '../../interface/UploadFileButton';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

interface IImgUrl {
  secure_url: string;
}
export default function UploadFileButton({ ...inputProps }: IUploadFile): JSX.Element {
  const classes = useStyles();
  const URL = 'https://api.cloudinary.com/v1_1/dog-sitter/image/upload';
  const [image, setImage] = useState<any>('');

  const onChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImage(file);
    uploadImage();
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'dog-sitter');
    try {
      const res = await axios.post<IImgUrl>(URL, formData);

      const imageUrl = res.data.secure_url;
      const image = await axios.post('/profile', {
        imageUrl,
      });

      setImage(image.data);
    } catch (err) {
      console.error(err);
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
