import React from 'react';
//redux
import MessagesPage from './MessagesPage'
//bootstrap
import { Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';

import LoginRequiredRoute from './LoginRequiredRoute';
import LoginPage from '../components/LoginPage';
import TalkRoomPage from './TalkRoomPage'
import HomePage from './HomePage';
import SignUpPage from '../components/SignUpPage';


/**
 * チャットアプリくんのルーティングと、
 * それとコンポーネントの対応を設定するコンポーネント
 */

const ChatLikeAppRouter = ({children}) => (
    <Router>
        {children}
        <Switch>
            <Route path="/signin" component={LoginPage}/>
            <Route path="/signup" component={SignUpPage} />
            <LoginRequiredRoute exact path="/home" component={HomePage}/>
            <LoginRequiredRoute exact path="/talk_rooms" component={TalkRoomPage} />
            <LoginRequiredRoute exact path="/talk_rooms/:id" component={MessagesPage}/>
            <Redirect to="/home" />
        </Switch>
    </Router>
)

export default ChatLikeAppRouter