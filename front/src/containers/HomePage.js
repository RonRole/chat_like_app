import React from 'react'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'

export class HomePage extends React.Component {
    render() {
        return (
            <Container　className="d-flex justify-content-center">
                <section id="info">
                    <div id="loginUserID">
                        <strong style={{borderBottom:"1px solid gray"}}>ユーザーID</strong>
                        <div>{this.props.loginUser.id}</div>
                    </div>
                    <div id="loginUserName">
                        <strong style={{borderBottom:"1px solid gray"}}>お名前</strong>
                        <div>{this.props.loginUser.name}</div>
                    </div>
                    <div id="loginUserSecondName">
                        <strong style={{borderBottom:"1px solid gray"}}>二つ名</strong>
                        <div>函館のソクラテス</div>
                    </div>
                </section>
                <img style={{objectFit:'contain'}} src={`${process.env.REACT_APP_BACKEND_ADDRESS}/${this.props.loginUser.image.profile.url}`} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(HomePage)