import React from 'react';
//bootstrap
import { Link } from 'react-router-dom';

import ChatLikeAppNavigation from './ChatLikeAppNavigation'
import DefaultLoginChecker from '../containers/DefaultLoginChecker';
import Loading from '../containers/Loading';
import ChatLikeAppRouter from './ChatLikeAppRouter';


/**
 * ローディング画面の配置
 * ルーティングの設定
 * ルーティングに対応したコンポーネントの配置
 */
export class App extends React.Component {
  render() {
    return (
      <Loading>
        <DefaultLoginChecker>
            <ChatLikeAppRouter>
                <ChatLikeAppNavigation>
                  <Link className = "nav-link" to="/home">Home</Link>
                  <Link className = "nav-link" to="/signup">Sign Up</Link>
                  <Link className = "nav-link" to="/signin">Sign In</Link>
                  <Link className = "nav-link" to="/talk_rooms">Talk Rooms</Link>
                </ChatLikeAppNavigation>
            </ChatLikeAppRouter>
        </DefaultLoginChecker>
        </Loading>
    )
  }
}

export default App
