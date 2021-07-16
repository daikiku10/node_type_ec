import { FC } from 'react';
import { Button, makeStyles } from '@material-ui/core';

type ColorButtonProps = {
  label: string;
  background: string;
  color: string;
  onClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  marginButton: {
    marginLeft: 5
  },
}));


const ColorButton: FC<ColorButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      style={{background: props.background, color: props.color}}
      onClick={props.onClick}
      className={classes.marginButton}
      >
        {props.label}
    </Button>
  )
}

export default ColorButton