import React, { useEffect } from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import LogModule from '../modules/logModule/LogModule'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { withRouter } from 'react-router-dom'
import UserFormGroups from '../components/UserFormGroups'

const LoginForm = ({
    history
}) => {
    const loginFormError=useSelector(state=>state.formErrors.loginForm)
    const loginErrorMessages = (loginFormError || {}).messages
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(FormErrorModule.actions.clearErrorByName('loginForm'))
        }
    }, [])
    return (
        <Form onSubmit={(formEvent) => {
            formEvent.preventDefault()
            const input = formEvent.currentTarget
            dispatch(LogModule.actions.execLogin(
                {
                    session:{
                        name    : input.name.value,
                        password: input.password.value
                    },
                    history               
                }
            ))
        }}>
            <UserFormGroups.NameFormGroup errorMessages={loginErrorMessages} />
            <UserFormGroups.PasswordFormGroup errorMessages={loginErrorMessages} />
            <Button variant="primary" type="submit">ログイン</Button>
        </Form>
    )
}

export default withRouter(LoginForm)
