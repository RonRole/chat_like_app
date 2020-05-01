import React from 'react'
import { connect } from 'react-redux'
import UserProfile from '../components/UserProfile'
import { Button, Container } from 'react-bootstrap'
import UpdateUserForm from './UpdateUserForm'

export class HomePage extends React.Component {

    state = {
        updateUserModalShow:false
    }

    render() {
        return (
            <Container className="justify-content-end">
                <UserProfile user={this.props.loginUser} className="mb-2"/>
                <div className="d-flex justify-content-center">
                    <Button onClick={() => this.setState({updateUserModalShow:true})}>プロフィールを更新する</Button>
                </div>
                <UpdateUserForm userId={this.props.loginUser.id} show={this.state.updateUserModalShow} onCancel={() => this.setState({updateUserModalShow:false})} />
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

export default connect(mapStateToProps)(HomePage)
