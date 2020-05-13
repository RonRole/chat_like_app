import React from 'react';
//bootstrap
import { Link } from 'react-router-dom';

import Navigation from '../components/Navigation'
import DefaultLoginChecker from './DefaultLoginChecker';
import ChatLikeAppRouter from './ChatLikeAppRouter';
import Loading from './Loading';

/**
 * ローディング画面の配置
 * ルーティングの設定
 * ルーティングに対応したコンポーネントの配置
 */
export class App extends React.Component {
  render() {
    return (
      <DefaultLoginChecker>
        <ChatLikeAppRouter>
          <Loading>
            <Navigation>
              <Link className = "nav-link" to="/home">Home</Link>
              <Link className = "nav-link" to="/signup">Sign Up</Link>
              <Link className = "nav-link" to="/signin">Sign In</Link>
              <Link className = "nav-link" to="/talk_rooms">Talk Rooms</Link>
            </Navigation>
          </Loading>
        </ChatLikeAppRouter>
      </DefaultLoginChecker>
    )
  }
}

export default App
