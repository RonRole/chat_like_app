import React, { useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import UserModule from '../modules/userModule/UserModule'
import { connect, useDispatch, useSelector } from 'react-redux'
import UserFormGroups, { NameFormGroup, PasswordFormGroup, PasswordConfirmationFormGroup, ProfileImageFormGroup } from '../components/UserFormGroups'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { withRouter } from 'react-router-dom'

const SignUpForm = ({
    history
}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(FormErrorModule.actions.clearErrorByName('signUpForm'))
        }
    }, [])
    const formErrorStatus = useSelector(state=>state.formErrors)
    const signUpFormErrors = formErrorStatus.signUpForm || {}

    return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            const input=e.currentTarget
            dispatch(UserModule.actions.execCreateUser({
                userParams: {
                    name: input.name.value,
                    password: input.password.value,
                    password_confirmation:　input.password_confirmation.value,
                    image: input.image.files[0]
                },
                history
            }))
        }}>
            <UserFormGroups.NameFormGroup errorMessages = {signUpFormErrors.name}/>
            <UserFormGroups.PasswordFormGroup errorMessages = {signUpFormErrors.password} />
            <UserFormGroups.PasswordConfirmationFormGroup errorMessages = {signUpFormErrors.password_confirmation} />
            <UserFormGroups.ProfileImageFormGroup errorMessages = {signUpFormErrors.image}/>
            <Button variant="primary" type="submit">登録する</Button>
        </Form>
    )

}

export default withRouter(SignUpForm)