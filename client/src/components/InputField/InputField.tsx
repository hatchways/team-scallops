import { Box, InputLabel, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import useStyles from './useStyles';

interface Props {
  id: string;
  name: string;
  label: string;
  className?: string;
  value: string;
  margin?: 'normal';
  placeholder: string;
  error: boolean;
  helperText: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  variant: 'filled' | 'standard' | 'outlined' | undefined;
}

export default function InputField({
  id,
  name,
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
