import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { IconButtonSelect, icon } from "../atoms/IconButtonSelect";
import { useAppDispatch } from "../../app/hooks";


// MaterialUI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";
import { AppBar, Container, Toolbar, Typography, Grid, } from "@material-ui/core";
import { loginAsync, logoutAsync } from "../../features/user/userSlice";

const headers = {
  logins: [{
    text: "ログアウト",
    icon: "Logout",
    link: ""
  }],
  logouts: [{
    text: "ログイン",
    icon: "Login",
    link: ""
  }],
  items: [
    {
      text: "ショッピングカート",
      icon: "Cart",
      link: "/cart-item-list"
    },
    {
      text: "注文履歴",
      icon: "History",
      link: "/order-history"
    }
  ]

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 0.5,
    },
    mr20: {
      marginRight: 10,
    },
    menu: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    items: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    userName: {
      "&:hover": {
        color: "red",
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  })
);

export interface headerItems {
  text: string;
  icon: icon;
  link: string;
}

const Header: FC = () => {
  const classes: ClassNameMap = useStyles();
  const history = useHistory();
  const handleClick = (link: string): void => {
    history.push(link);
  };
  // 仮定義
  const dispatch = useAppDispatch();

  // 仮ログイン処理
  const login = (): void =>{
    dispatch(loginAsync());
  }
  // 仮ログアウト処理
  const logout = (): void => {
    dispatch(logoutAsync());
  }
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{ background: "#CF000D" }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              onClick={() => history.push('/')}
              style={{ cursor: "pointer" }}>
                ラクラクラーメン
            </Typography>
            <div className={classes.grow} />
            <>
              {headers.items.map((item, index) => (
                <div className={classes.items} key={index} style={{ marginRight: 10, marginLeft: 10}}>
                  <Grid container direction={"column"}>
                    <div style={{ textAlign: "center"}}>
                      <IconButtonSelect
                        icon={item.icon}
                        onClick={() => handleClick(item.link)}
                      />
                    </div>
                    <div style={{ textAlign: "center"}}>
                      <small>{item.text}</small>
                    </div>
                  </Grid>
                </div>
              ))}
            </>
            <div className={classes.grow} />
            {headers.logins.map((login, index) => (
              <div className={classes.menu} key={index}>
                <IconButtonSelect
                  icon={login.icon}
                  onClick={() => logout()}
                />ログアウト
              </div>
            ))}
            {headers.logouts.map((logout, index) => (
              <div className={classes.menu} key={index}>
                <IconButtonSelect
                  icon={logout.icon}
                  onClick={() => login()}
                />ログイン
              </div>
            ))

            }
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header;