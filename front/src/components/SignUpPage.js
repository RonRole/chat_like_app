import React from 'react'
import { Container} from 'react-bootstrap'
import SignUpForm from '../containers/SignUpForm'

class SignUpPage extends React.Component {
    render() {
        return (
            <Container>
                <strong>新規登録</strong>
                <SignUpForm history={this.props.history}/>
            </Container>
        )
    }
}

export default SignUpPage