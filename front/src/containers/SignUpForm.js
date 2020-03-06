import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import "./SignUpForm.css"
import { NameFormGroup, PasswordFormGroup, PasswordConfirmFormGroup, ProfileImageFormGroup } from '../components/UserFormGroups'

class SignUpForm extends React.Component {

    render() {
        return (
            <Form onSubmit={(e) => {
                e.preventDefault()
                const input=e.currentTarget
                this.props.signUp({
                    input: input,
                    history : this.props.history
                })
            }}>
                <NameFormGroup />
                <PasswordFormGroup />
                <PasswordConfirmFormGroup/>
                <ProfileImageFormGroup />
                <Button variant="primary" type="submit">送りますわ</Button>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp : ({
            input,
            history
        }) => {
            dispatch(UserModule.actions.execCreateUser({
                userParams: {
                    name: input.name.value,
                    password: input.password.value,
                    password_confirmation:　input.password_confirmation.value,
                    image: input.image.files[0]
                },
                history:history
            }))
        }
    }
}

export default connect(null, mapDispatchToProps)(SignUpForm)