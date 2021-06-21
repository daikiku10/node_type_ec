import React from 'react'
import { useHistory } from 'react-router-dom';
import { Container,Button } from '@material-ui/core'

const OrderComplete = () => {
  const history = useHistory();
  const handleLink = (path: any) => history.push(path)
  return (
    <Container>
      <h2>決済が完了しました！</h2>
      <p>この度はご注文ありがとうございます。</p>
      <Button onClick={() => handleLink('/')}>トップ画面に戻る</Button>
    </Container>
  )
}

export default OrderComplete