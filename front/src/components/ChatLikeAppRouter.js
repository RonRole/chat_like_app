import React from 'react';
//redux
import CurrentRoomPage from './CurrentRoomPage'
//bootstrap
import { Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';

import LoginRequiredRoute from '../containers/LoginRequiredRoute';
import LoginPage from './LoginPage';
import TalkRoomPage from './TalkRoomPage'
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';


/**
 * チャットアプリくんのルーティングと、
 * それとコンポーネントの対応を設定するコンポーネント
 */

const ChatLikeAppRouter = ({
    children,
    ...props
}) => (
    <Router {...props}>
        {children}
        <Switch>
            <Route path="/signin" component={LoginPage}/>
            <Route path="/signup" component={SignUpPage} />
            <LoginRequiredRoute exact path="/home" component={HomePage}/>
            <LoginRequiredRoute exact path="/talk_rooms" component={TalkRoomPage} />
            <LoginRequiredRoute exact path="/talk_rooms/:id" component={CurrentRoomPage}/>
            <Redirect to="/home" />
        </Switch>
    </Router>
)

export default ChatLikeAppRouter