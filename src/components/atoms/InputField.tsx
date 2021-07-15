import { FC } from 'react';
import { TextField } from '@material-ui/core';

interface InputFieldProps {
  label: string;
  value?: string;
  onChange?: () => void;
}

const InputField: FC<InputFieldProps> = (props) => {
  return (
    <TextField
      variant="filled"
      autoComplete="off"
      label={props.label}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default InputField;