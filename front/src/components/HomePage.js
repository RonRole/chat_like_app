import React from 'react'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'

class HomePage extends React.Component {
    render() {
        console.log(this.props.loginUser)
        return (
            <div>
                <h1>Here is Home Page!!!</h1>
                <img src={`${process.env.REACT_APP_BACKEND_ADDRESS}/${this.props.loginUser.image.url}`} />
                <div>
                    <strong>ID : {this.props.loginUser.id}</strong>
                </div>
                <div>
                    <strong>NAME : {this.props.loginUser.name}</strong>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(HomePage)