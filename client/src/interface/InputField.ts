import { ChangeEvent } from 'react';

export interface IInputField {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  className?: string;
  variant: 'filled' | 'standard' | 'outlined' | undefined;
  margin?: 'normal';
  error: boolean | undefined;
  helperText: string | undefined;
  value: string;
  handleChange: (e: string | ChangeEvent) => void;
}
