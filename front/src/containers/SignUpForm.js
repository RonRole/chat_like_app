import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import "./SignUpForm.css"
import { NameFormGroup, PasswordFormGroup, PasswordConfirmationFormGroup, ProfileImageFormGroup } from '../components/UserFormGroups'

class SignUpForm extends React.Component {

    componentWillUnmount(){
        this.props.clearErrorMessages()
    }

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
                <NameFormGroup errorMessages = {this.props.getErrorMessagesFromFormName("name")}/>
                <PasswordFormGroup errorMessages = {this.props.getErrorMessagesFromFormName("password")} />
                <PasswordConfirmationFormGroup errorMessages = {this.props.getErrorMessagesFromFormName("password_confirmation")} />
                <ProfileImageFormGroup errorMessages = {this.props.getErrorMessagesFromFormName("image")}/>
                <Button variant="primary" type="submit">送りますわ</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state : state,
        getErrorMessagesFromFormName : (name) => UserModule.reducer.getErrorsFromStateByFormName(state)(name)
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
        },
        clearErrorMessages : () => {
            dispatch(UserModule.actions.clearCreateFormErrors())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)