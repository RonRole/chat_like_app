import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import UserFormGroups, { NameFormGroup, PasswordFormGroup, PasswordConfirmationFormGroup, ProfileImageFormGroup } from '../components/UserFormGroups'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'

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
                    input,
                    history : this.props.history
                })
            }}>
                <UserFormGroups.NameFormGroup errorMessages = {this.props.getErrorMessagesFromFormName("name")}/>
                <UserFormGroups.PasswordFormGroup errorMessages = {this.props.getErrorMessagesFromFormName("password")} />
                <UserFormGroups.PasswordConfirmationFormGroup errorMessages = {this.props.getErrorMessagesFromFormName("password_confirmation")} />
                <UserFormGroups.ProfileImageFormGroup errorMessages = {this.props.getErrorMessagesFromFormName("image")}/>
                <Button variant="primary" type="submit">登録する</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state : state,
        getErrorMessagesFromFormName : (name) => FormErrorModule.reducer.getErrorsOf(state)("signUpForm")(name)
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
                history
            }))
        },
        clearErrorMessages : () => {
            dispatch(FormErrorModule.actions.clearErrorByName("signUpForm"))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)