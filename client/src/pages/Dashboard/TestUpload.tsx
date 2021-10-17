import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }),
);

export default function UploadButtons() {
  const classes = useStyles();
  const [img, setImg] = useState<any>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOptions = {
    method: 'POST',
    image: img,
  };
  useEffect(() => {
    fetch(`/profile`, fetchOptions).then((res) => res.json());
    console.log('useEffect fired');
  }, [fetchOptions]);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(img);
    return await fetch(`/auth/profile`, fetchOptions).then((res) => res.json());
  };
  const getFileInfo = (e: any) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    setImg(formData);
  };
  console.log(img);
  return (
    <form onSubmit={onSubmit} className={classes.root}>
      <input
        onChange={getFileInfo}
        // onChange={(e: any) => {
        //   setImg(URL.createObjectURL(e.target.files[0]));
        // }}
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        name="images"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <img src={img && img}></img>
    </form>
  );
}
