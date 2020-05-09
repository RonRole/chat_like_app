import React from 'react'
import { connect } from 'react-redux'
import UserProfile from '../components/UserProfile'
import { Button, Container } from 'react-bootstrap'
import UpdateUserForm from './UpdateUserForm'
import LogModule from '../modules/logModule/LogModule'

export class HomePage extends React.Component {

    state = {
        updateUserModalShow:false
    }

    render() {
        return (
            <Container className="justify-content-end">
                <UserProfile user={this.props.loginUser} className="mb-2"/>
                <div className="d-flex justify-content-center mb-2">
                    <Button onClick={() => this.setState({updateUserModalShow:true})}>プロフィールを更新する</Button>
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant='danger' onClick={() => this.props.logout({history:this.props.history})}>ログアウト</Button>
                </div>
                <UpdateUserForm user={this.props.loginUser} show={this.state.updateUserModalShow} onCancel={() => this.setState({updateUserModalShow:false})} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        loginUser : state.logStatus.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout : ({
            history
        }) => {
            dispatch(LogModule.actions.execLogout({
                history
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
