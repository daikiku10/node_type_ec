// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import createStore from './redux/store/store';
import ItemList from './templates/ItemList';
import userEvent from '@testing-library/user-event';

describe('商品一覧ページのテスト', () => {
  // テストケースを実行する前にやってほしい処理
  beforeEach(() => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ItemList />
      </Provider>
    )
    // screen.debug();
  })

  test('検索フィールドの有無', () => {
    expect(screen.getByText('Search Noodle')).toBeInTheDocument();
    // テキストボックス（<input />）要素の取得
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    userEvent.type(screen.getByRole('textbox'), 'とんこつラーメン');
    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'とんこつラーメン'}
    // });


    // ↓は動作しない。テキストの要素を持たないことを示すが、getByはエラーをスローしてアサーションを妨げてしまうため。
    // この場合にqueryByを使用する
    // expect(screen.getByText('こんにちは！これはテストです！')).toBeNull();
    expect(screen.queryByText('これはテストです！')).toBeNull();
  })

  test('検索ボタンの有無', () => {
    expect(screen.getByText('検索')).toBeInTheDocument();
  })

  test('クリアボタンの有無', () => {
    expect(screen.getByText('クリア')).toBeInTheDocument();
  })

})