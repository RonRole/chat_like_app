import React from 'react'
import { connect } from 'react-redux'
import UserProfile from '../components/UserProfile'

export class HomePage extends React.Component {
    render() {
        return (
           <UserProfile user={this.props.loginUser} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logStatus.isLoggedIn
    }
}

export default connect(mapStateToProps)(HomePage)
