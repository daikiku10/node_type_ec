import { FC } from 'react';
import { Button } from '@material-ui/core';

type ColorButtonProps = {
  label: string;
  background: string;
  color: string;
  onClick: () => void;
}

const ColorButton: FC<ColorButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      style={{background: props.background, color: props.color}}
      onClick={props.onClick}
      >
        {props.label}
    </Button>
  )
}

export default ColorButton