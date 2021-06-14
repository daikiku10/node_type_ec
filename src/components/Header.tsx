import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{color:"#fff"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} >らくらくラーメン</Typography>
          <Button color="inherit">ショッピングカート</Button>
          <Button color="inherit">注文履歴</Button>
          <Button color="inherit">ログイン</Button>
          <Button color="inherit">ログアウト</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header