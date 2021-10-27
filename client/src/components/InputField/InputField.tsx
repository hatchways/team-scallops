import { Box, InputLabel, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import useStyles from './useStyles';

interface Props {
  id: string;
  type: string;
  name: string;
  label: string;
  className?: string;
  value: string;
  margin?: 'normal';
  placeholder: string;
  error: boolean | undefined;
  helperText: string | undefined;
  handleChange: (e: string | ChangeEvent<any>) => void;
  variant: 'filled' | 'standard' | 'outlined' | undefined;
}

export default function InputField({
  id,
  name,
  type,
  value,
  label,
  handleChange,
  placeholder,
  variant,
  error,
  helperText,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <InputLabel htmlFor="username">
        <Typography className={classes.label} color="textPrimary">
          {label}
        </Typography>
      </InputLabel>
      <TextField
        id={id}
        type={type}
        margin="normal"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          classes: { input: classes.inputs },
        }}
        name={name}
        autoComplete={name}
        autoFocus
        helperText={helperText}
        error={error}
        value={value}
        placeholder={placeholder}
        variant={variant}
        onChange={handleChange}
      />
    </Box>
  );
}
