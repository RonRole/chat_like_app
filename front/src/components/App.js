import React from 'react';
//bootstrap
import { Link } from 'react-router-dom';

import ChatLikeAppNavbar from './ChatLikeAppNavigation'
import DefaultLoginChecker from '../containers/DefaultLoginChecker';
import Loading from '../containers/Loading';
import ChatLikeAppRouter from './ChatLikeAppRouter';

const App = ({
  ...props
}) => {
  return (
    <div {...props}>
        <Loading/>
        <DefaultLoginChecker>
          <ChatLikeAppRouter>
            <ChatLikeAppNavbar>
              <Link className = "nav-link" to="/home">Home</Link>
              <Link className = "nav-link" to="/signup">Sign Up</Link>
              <Link className = "nav-link" to="/signin">Sign In</Link>
              <Link className = "nav-link" to="/talk_rooms">Talk Rooms</Link>
            </ChatLikeAppNavbar>
          </ChatLikeAppRouter>
        </DefaultLoginChecker>
    </div>
  )
}

export default App
