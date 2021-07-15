import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setItems_action } from '../redux/products/operations';
import { InitialState } from '../redux/store/initialState';
import { makeStyles } from "@material-ui/core/styles";
import {Button, Card, CardActionArea, CardContent, CardMedia, TextField,} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import Inner from '../components/inner/Inner';


const itemsSelector = (state: InitialState) => state.products.items
const userSelector = (state: InitialState) => state.user

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 220,
  },
  cardList: {
    display: "flex",
    flexWrap: "wrap",
    listStyleType: "none",
  },
  card: {
    width: "25%",
    marginTop: "30px",
    fontSize: "2px",
  },
  input: {
    margin: "30px 5px 0 0",
  },
  buttonSearch: {
    margin: "45px 5px 0 0",
  },
  buttonClear: {
    margin: "45px 5px 0 0",
  },
});

const ItemList = () => {
  const dispatch = useDispatch();
  const getUser = useSelector(userSelector)
  const getItems = useSelector(itemsSelector);
  const classes = useStyles();
  const [itemsArray, setItemsArray] = useState(getItems)
  const [mozi, setMozi] = useState<string>("")

  useEffect(() => {
    dispatch(setItems_action());
  },[getUser])

  useEffect(() => {
    setItemsArray(getItems)
  }, [getItems])

  // 検索処理
  const searchWord = () => {
    setItemsArray(getItems);
    let searchArray = getItems.filter((item) => {
      return 0 <= item.title.indexOf(mozi);
    })
    if (searchArray.length === 0){
      setItemsArray(getItems)
    } else {
      setItemsArray(searchArray)
    }
  }

  // クリアボタンの処理
  const clearBtn = () => {
    setMozi("")
    setItemsArray(getItems)
  }

  
  return (
    <Inner>
      <div style={{ textAlign: "center" }}>
        <TextField
          className={classes.input}
          id="filled-basic"
          label="Search Noodle"
          variant="filled"
          autoComplete="off"
          value={mozi}
          onChange={(e) => setMozi(e.target.value)}
        />
        <Button
          className={classes.buttonSearch}
          variant="contained"
          style={{ color: "#fff"}}
          onClick={searchWord}
        >
          検索
          <SearchIcon />
        </Button>
        <Button
          className={classes.buttonClear}
          variant="contained"
          style={{ color: "#fff"}}
          onClick={clearBtn}
        >
          クリア
          <DeleteIcon />
        </Button>
      </div>
      <ol className={classes.cardList}>
        {itemsArray ? 
        <>
          {itemsArray.map(item => (
            <li key={item.id} className={classes.card}>
              <Link to={`/item-detail/${item.id}`}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia className={classes.media}>
                      <img
                        style={{ width: 345, height: 200 }}
                        src={item.imgPath}
                        alt="Logo"
                      />
                    </CardMedia>
                    <CardContent>
                      <div style={{ fontSize: 20, textAlign: "center" }}>
                        {item.title}
                      </div>
                      <p style={{ fontSize: 16, textAlign: "center" }}>
                        Mサイズ {item.priceM.toLocaleString()}円(税込)
                      </p>
                      <p style={{ fontSize: 16, textAlign: "center" }}>
                        Lサイズ {item.priceL.toLocaleString()}円(税込)
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </li>
          ))}
        </>
        :
        <>
        </>
        }
      </ol>
    </Inner>
  )
}

export default ItemList