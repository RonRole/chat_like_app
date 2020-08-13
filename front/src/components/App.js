import React from 'react';
//bootstrap
import { Link } from 'react-router-dom';

import ChatLikeAppNavbar from './ChatLikeAppNavigation'
import DefaultLoginChecker from '../containers/DefaultLoginChecker';
import Loading from '../containers/Loading';
import ChatLikeAppRouter from './ChatLikeAppRouter';
import FrontAddress from '../address';

const App = ({
  ...props
}) => {
  return (
    <div {...props}>
        <Loading/>
        <DefaultLoginChecker>
          <ChatLikeAppRouter>
            <ChatLikeAppNavbar>
              <Link className = "nav-link" to={FrontAddress.home}>Home</Link>
              <Link className = "nav-link" to={FrontAddress.signup}>Sign Up</Link>
              <Link className = "nav-link" to={FrontAddress.signin}>Sign In</Link>
              <Link className = "nav-link" to={FrontAddress.talk_rooms}>Talk Rooms</Link>
              <Link className = "nav-link" to={FrontAddress.help}>Usage</Link>
            </ChatLikeAppNavbar>
          </ChatLikeAppRouter>
        </DefaultLoginChecker>
    </div>
  )
}

export default App
