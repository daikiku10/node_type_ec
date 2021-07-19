import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import {signIn, signOut} from '../redux/users/operations';
import { InitialState } from '../redux/store/initialState';
import { useAppDispatch } from '../app/hooks';
import { loginAsync, logoutAsync } from '../features/user/userSlice';

const userSelector = (state: InitialState) => state.user

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
  const dispatch2 = useAppDispatch();
  const history = useHistory();
  const handleLink = (path: any) => history.push(path)
  const getUser = useSelector(userSelector)

  // ログインの処理
  const login = ():void => {
    dispatch2(loginAsync());
    handleLink('/');
  }

  // ログアウトの処理
  const logout = ():void => {
    dispatch2(logoutAsync());
    handleLink('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{color:"#fff"}}>
        <Toolbar>
          <Link to={'/'}>
            <Typography variant="h6" className={classes.title} >らくらくラーメン</Typography>
          </Link>
          <Link to={'/cart-item-list'}>
            <Button color="inherit">ショッピングカート</Button>
          </Link>
          <Link to={'/order-history'}>
            <Button color="inherit">注文履歴</Button>
          </Link>
          {getUser ?
          <Button color="inherit" onClick={logout}>ログアウト</Button>
          :
          <Button color="inherit" onClick={login}>ログイン</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header