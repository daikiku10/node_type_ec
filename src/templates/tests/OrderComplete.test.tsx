import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore from '../../redux/store/store';
import OrderComplete from '../../templates/OrderComplete';

describe('注文確認画面', () => {
  beforeEach(() => {
    const store = createStore();
    render(
      <Provider store={store}>
        <OrderComplete />
      </Provider>
    )
  })

  test('タグの確認', () => {
    expect(screen.getByText('決済が完了しました！')).toBeInTheDocument();
    expect(screen.getByText('この度はご注文ありがとうございます。')).toBeInTheDocument();
    expect(screen.getByText('トップ画面に戻る')).toBeInTheDocument();
  })

  test('ボタンタグの有無', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  })
})
