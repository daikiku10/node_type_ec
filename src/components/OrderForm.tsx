import React, { useState } from 'react'
import { useAppDispatch } from '../app/hooks';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Box, Button, FormControl, MenuItem, Select, TextField, InputLabel, FormHelperText } from '@material-ui/core';
import { orderAsync, OrderType } from '../features/order/orderSlice';

interface OrderFormProps {
  getCart: OrderType
}

const OrderForm = ({ getCart }: OrderFormProps) => {
  const {register, handleSubmit, watch, formState:{errors}} = useForm<OrderType>();
  const selectPay = watch("payType")
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleLink = (path: any) => history.push(path)



  // 配達日時入力、配達日時エラー
  let timeError: string
  const today: Date = new Date();
  const year: number = today.getFullYear()
  const month: string = "0" + (1 + today.getMonth())
  const day: number = today.getDate()
  const hour: number = today.getHours()
  const second: number = today.getSeconds()
  const orderDate: number = Number(year + month + day)
  const orderTime: string = year + "-" + month + "-" + day + "-" + hour + "-" + second

  const [inputYear, setYear] = useState<number>(year)
  const changeYear = (e: any): void => {
    setYear(e.target.value)
  }
  const [inputMonth, setMonth] = useState<string>(month)
  const changeMonth = (e: any): void => {
    setMonth(e.target.value)
  }
  const [inputDate, setDate] = useState<number>(day)
  const changeDate = (e: any): void => {
    setDate(e.target.value)
  }
  const [inputHour, setHour] = useState<string>("")
  const changeHour = (e: any): void => {
    setHour(e.target.value)
  }
  const specifyDate =  Number(String(inputYear) + String(inputMonth)  + String(inputDate))
  const specifyTime = inputYear + "-" + inputMonth + "-" + inputDate + "-"  + inputHour + ":" + "00"
  if(inputHour === ''){
    timeError = "配達希望日時を入力"
  }else if(orderDate - specifyDate > 0){
    timeError = "過去の日付は選択できません"
  }else if(orderDate === specifyDate){
    if(Number(inputHour) - hour < 4 || Number(inputHour) - hour < 0){
      timeError = "3時間後以降の日時を入力"
    }else{
      timeError = ''
    }
  }else{
    timeError = ''
  }

  const onSubmit = handleSubmit((data: OrderType) => {
    // name, email, zipcode, address, tel, payType, cardNo以外の情報をdataへ追加
    data.orderDateTime = specifyTime
    data.destinationTime = orderTime
    if(data.payType === "1"){
      data.status = 1
    } else if (data.payType === "2"){
      data.status = 2
    }
    data._id = getCart._id
    data.uid = getCart.uid
    data.itemInfo = getCart.itemInfo
    dispatch(orderAsync(data))
    handleLink('/order-complete')
  });



  return (
    <Box>
      <Box mt={2}>
        <TextField label="名前" style={{width: 300}}
          {...register("name",{
            required: true,
          })}
          helperText={errors.name && errors.name.message} />
      </Box>
      <Box mt={2}>
        <TextField label="メールアドレス" style={{width: 300}}
          {...register("email",{
            required: "メールアドレスを入力してください",
            pattern: {
              value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: "メールアドレスを正しく入力して下さい"
            },
          })}
          helperText={errors.email && errors.email.message} />
      </Box>
      <Box mt={2}>
        <TextField label="郵便番号" style={{width: 300}}
          {...register("zipcode",{
            required: "郵便番号を入力してください",
            pattern: {
              value: /^[0-9]{3}-[0-9]{4}$/,
              message: "郵便番号の形式が不正です"
            },
          })}
          helperText={errors.zipcode && errors.zipcode.message} />
      </Box>
      <Box mt={2}>
        <TextField label="住所" style={{width: 300}}
          {...register("address",{
            required: true
          })}
          helperText={errors.address && errors.address.message} />
      </Box>
      <Box mt={2}>
        <TextField label="電話番号" style={{width: 300}}
          {...register("tel",{
            required: "電話番号を入力してください",
            pattern: {
              value:/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
              message:"XXX−XXXX-XXXXの形式で入力してください"
            }
          })}
          helperText={errors.tel && errors.tel.message} />
      </Box>
      <Box mt={2}>
        <FormControl>
          <InputLabel>年</InputLabel>
          <Select
          value={inputYear}
          style = {{width: 100}} 
          onChange={(e) => changeYear(e)}
          >
            <MenuItem value={year}>{year}年</MenuItem>
            <MenuItem value={year + 1}>{year + 1}年</MenuItem>
          </Select>
          <FormHelperText>{timeError}</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>月</InputLabel>
          <Select
            style = {{width: 100}} 
            value={inputMonth}
            onChange={(e) => changeMonth(e)}
            >
            <MenuItem value="01">1月</MenuItem>
            <MenuItem value="02">2月</MenuItem>
            <MenuItem value="03">3月</MenuItem>
            <MenuItem value="04">4月</MenuItem>
            <MenuItem value="05">5月</MenuItem>
            <MenuItem value="06">6月</MenuItem>
            <MenuItem value="07">7月</MenuItem>
            <MenuItem value="08">8月</MenuItem>
            <MenuItem value="09">9月</MenuItem>
            <MenuItem value="10">10月</MenuItem>
            <MenuItem value="11">11月</MenuItem>
            <MenuItem value="12">12月</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>日</InputLabel>
          <Select
          style = {{width: 100}} 
          value={inputDate}
          onChange={(e) => changeDate(e)}
          >
            <MenuItem value="1">1日</MenuItem>
            <MenuItem value="2">2日</MenuItem>
            <MenuItem value="3">3日</MenuItem>
            <MenuItem value="4">4日</MenuItem>
            <MenuItem value="5">5日</MenuItem>
            <MenuItem value="6">6日</MenuItem>
            <MenuItem value="7">7日</MenuItem>
            <MenuItem value="8">8日</MenuItem>
            <MenuItem value="9">9日</MenuItem>
            <MenuItem value="10">10日</MenuItem>
            <MenuItem value="11">11日</MenuItem>
            <MenuItem value="12">12日</MenuItem>
            <MenuItem value="13">13日</MenuItem>
            <MenuItem value="14">14日</MenuItem>
            <MenuItem value="15">15日</MenuItem>
            <MenuItem value="16">16日</MenuItem>
            <MenuItem value="17">17日</MenuItem>
            <MenuItem value="18">18日</MenuItem>
            <MenuItem value="19">19日</MenuItem>
            <MenuItem value="20">20日</MenuItem>
            <MenuItem value="21">21日</MenuItem>
            <MenuItem value="22">22日</MenuItem>
            <MenuItem value="23">23日</MenuItem>
            <MenuItem value="24">24日</MenuItem>
            <MenuItem value="25">25日</MenuItem>
            <MenuItem value="26">26日</MenuItem>
            <MenuItem value="27">27日</MenuItem>
            <MenuItem value="28">28日</MenuItem>
            <MenuItem value="29">29日</MenuItem>
            <MenuItem value="30">30日</MenuItem>
            <MenuItem value="31">31日</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>時間</InputLabel>
          <Select
            style = {{width: 100}} 
            value={inputHour}
            onChange={(e) => changeHour(e)}
            >
            <MenuItem value={8}>08:00</MenuItem>
            <MenuItem value={9}>09:00</MenuItem>
            <MenuItem value={10}>10:00</MenuItem>
            <MenuItem value={11}>11:00</MenuItem>
            <MenuItem value={12}>12:00</MenuItem>
            <MenuItem value={13}>13:00</MenuItem>
            <MenuItem value={14}>14:00</MenuItem>
            <MenuItem value={15}>15:00</MenuItem>
            <MenuItem value={16}>16:00</MenuItem>
            <MenuItem value={17}>17:00</MenuItem>
            <MenuItem value={18}>18:00</MenuItem>
            <MenuItem value={19}>19:00</MenuItem>
            <MenuItem value={20}>20:00</MenuItem>
            <MenuItem value={21}>21:00</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <select {...register("payType",{required: true})} style={{width: 300}}>
          <option value="" hidden>支払い方法選択</option>
          <option value="1">代金引換</option>
          <option value="2">クレジットカード決済</option>
        </select>
        <div>
          {selectPay === "2" ? 
          <TextField label="クレジットカード番号" style={{width: 300}}
            {...register("cardNo",{
              required: "クレジットカード番号を入力してください",
              pattern:{
                value:/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                message:"XXXX−XXXX-XXXXの形式で入力してください"
              },
            })}
            helperText={errors.cardNo && errors.cardNo.message}
          />
          :
          <></>
          }
        </div>
      </Box>
      <Box mt={3}>
        <Button onClick={onSubmit}>この内容で注文する</Button>
      </Box>
    </Box>
  )
}

export default OrderForm