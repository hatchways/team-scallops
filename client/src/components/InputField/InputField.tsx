import { Box, InputLabel, TextField, Typography } from '@material-ui/core';
import { IInputField } from '../../interface/InputField';
import useStyles from './useStyles';

export default function InputField({
  id,
  name,
  label,
  placeholder,
  type,
  variant,
  error,
  helperText,
  value,
  handleChange,
}: IInputField): JSX.Element {
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
        name={name}
        type={type}
        variant={variant}
        placeholder={placeholder}
        margin="normal"
        fullWidth
        autoFocus
        autoComplete={name}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          classes: { input: classes.inputs },
        }}
        helperText={helperText}
        error={error}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
