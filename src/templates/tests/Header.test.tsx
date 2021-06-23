import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import createStore from '../../redux/store/store';
import Header from '../../components/Header';
import userEvent from '@testing-library/user-event';

describe('ヘッダーコンポーネントのテスト',() => {
  beforeEach(() => {
    const store = createStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )
  })

  test('タイトルの有無', () => {
    expect(screen.getByText('らくらくラーメン')).toBeInTheDocument();
  })

  test('ショッピングカートボタンの有無', () => {
    expect(screen.getByText('ショッピングカート')).toBeInTheDocument();
  })

  test('注文履歴ボタンの有無', () => {
    expect(screen.getByText('注文履歴')).toBeInTheDocument();
  })

  // 初期はログインボタンが表示されている
  // test('ログアウトボタンの有無', () => {
  //   expect(screen.getByText('ログアウト')).toBeInTheDocument();
  // })

  test('ログインボタンの有無', () => {
    expect(screen.getByText('ログイン')).toBeInTheDocument();
  })

})