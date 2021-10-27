import { InputLabel, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './useStyles';

interface Props {
  id: string;
  fullWidth: boolean;
  name: string;
  label: string;
  className?: string;

  margin?: 'normal';
  placeholder: string;
  variant: 'filled' | 'standard' | 'outlined' | undefined;
}

export default function InputField({
  id,
  fullWidth,
  name,
  className,

  label,
  margin,
  placeholder,
  variant,
}: Props) {
  const classes = useStyles();
  return (
    <div>
      <InputLabel htmlFor="username">
        <Typography className={classes.label} color="textPrimary">
          {label}
        </Typography>
      </InputLabel>
      <TextField
        className={className}
        id={id}
        fullWidth={fullWidth}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        // InputProps={{
        //   classes: { input: classes.inputs },
        // }}
        name={name}
        autoComplete={name}
        autoFocus
        // helperText={name}
        // error={true}
        //value={values.username}
        placeholder={placeholder}
        variant={variant}
        //onChange={handleChange}
      />
    </div>
  );
}
