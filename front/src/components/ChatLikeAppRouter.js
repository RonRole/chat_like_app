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
import FrontAddress from '../address';
import ChatLikeAppHelpPage from './ChatLikeAppHelpPage';


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
            <Route path={FrontAddress.signin} component={LoginPage}/>
            <Route path={FrontAddress.signup} component={SignUpPage} />
            <Route path={FrontAddress.help} component={ChatLikeAppHelpPage} />
            <LoginRequiredRoute exact path={FrontAddress.home} component={HomePage}/>
            <LoginRequiredRoute exact path={FrontAddress.talk_rooms} component={TalkRoomPage} />
            <LoginRequiredRoute exact path={FrontAddress.current_talk_room} component={CurrentRoomPage}/>
            <Redirect to={FrontAddress.home} />
        </Switch>
    </Router>
)

export default ChatLikeAppRouter