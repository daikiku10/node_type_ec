import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardContent, CardMedia, TextField } from "@material-ui/core";
import Inner from '../components/inner/Inner';
import { ColorButton, InputField } from '../components/atoms';
import { selectUser } from '../features/user/userSlice';
import { ItemType, selectItems } from '../features/item/itemsSlice';


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
  const dispatch = useAppDispatch();
  const getUser = useAppSelector(selectUser);
  const getItems = useAppSelector(selectItems);
  const classes = useStyles();
  const [itemsArray, setItemsArray] = useState(getItems)
  const [mozi, setMozi] = useState<string>("")

  useEffect(() => {
    setItemsArray(getItems)
  }, [getItems])

  // 検索処理
  const searchWord = () => {
    if (mozi === "" || mozi === undefined) {
      setItemsArray(getItems)
    } else {
      let searchArray = getItems[0].items.filter((item) => {
        return 0 <= item.title.indexOf(mozi);
      })
      let searchGetItems:any = [{items:{}}];
      if(searchGetItems.length > 0) {
        searchGetItems[0].items = searchArray
        console.log(searchGetItems)
        setItemsArray(searchGetItems);
        setMozi("")
      } 
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
        {/* <InputField
          label={"ラーメン検索"}
        /> */}
        <ColorButton 
          label={"検索"}
          background={"#CF000D"}
          color={"#fff"}
          onClick={() => searchWord()}
        />
        <ColorButton
          label={"クリア"}
          background={"#CF000D"}
          color={"#fff"}
          onClick={() => clearBtn()}
         />
      </div>
      <ol className={classes.cardList}>
        {itemsArray.length > 0 ? 
        <>
          {itemsArray[0].items.map(item => (
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