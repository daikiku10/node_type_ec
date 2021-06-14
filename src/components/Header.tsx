import React from 'react'
import { useDispatch} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import {signIn, signOut} from '../redux/users/operations';


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
  const dispatch = useDispatch();

  // ログインの処理
  const login = ():void => {
    console.log('ログイン')
    dispatch(signIn());
  }

  // ログアウトの処理
  const logout = ():void => {
    console.log('ログアウト')
    dispatch(signOut());
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{color:"#fff"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} >らくらくラーメン</Typography>
          <Button color="inherit">ショッピングカート</Button>
          <Button color="inherit">注文履歴</Button>
          <Button color="inherit" onClick={login}>ログイン</Button>
          <Button color="inherit" onClick={logout}>ログアウト</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header