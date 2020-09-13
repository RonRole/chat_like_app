import React, { useEffect } from 'react'
import { useState } from "react"
import UserActions from '../modules/userModule/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import FormNames from '../modules/FormErrorModule/FormNames'
import FormErrorActions from '../modules/FormErrorModule/FormErrorActions'

const { default: ModalForm } = require("../components/ModalForm")
const { Modal, Button } = require("react-bootstrap")
const { default: UserFormGroups } = require("../components/UserFormGroups")

const UpdatePasswordForm = ({
    show,
    onHide,
    ...props
}) => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    const formErrors = useSelector(state=>state.formErrors)
    const updatePasswordFormErrors = formErrors[FormNames.updatePasswordForm] || {}
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if(!show) {
                dispatch(FormErrorActions.clearErrorByName(FormNames.updatePasswordForm))
            }
        }
    }, [show])
    return (
        <ModalForm onHide={onHide} show={show} onSubmit={e => {
            e.preventDefault()
            const inputs = e.currentTarget
            dispatch(FormErrorActions.clearErrorByName(FormNames.updatePasswordForm))
            dispatch(UserActions.execUpdatePassword({
                userId : loginUser.id,
                oldPassword : inputs.oldPassword.value,
                newPassword : inputs.newPassword.value,
                newPasswordConfirmation : inputs.newPasswordConfirmation.value
            }))
        }} {...props}>
            <Modal.Header closeButton>
                パスワード変更
            </Modal.Header>
            <Modal.Body>
                <UserFormGroups.PasswordFormGroup errorMessages={updatePasswordFormErrors.old_password} controlId='oldPassword' label='現在のパスワード'/>
                <UserFormGroups.PasswordFormGroup errorMessages={updatePasswordFormErrors.password} controlId='newPassword' label='新しいパスワード'/>
                <UserFormGroups.PasswordConfirmationFormGroup errorMessages={updatePasswordFormErrors.password_confirmation} controlId='newPasswordConfirmation' />
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit'>更新</Button>
                <Button variant='secondary' onClick={onHide}>やめる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

const ShowButton = ({
    children,
    ...props
}) => {
    const [show, setShow] = useState(false)
    return (
        <>
            <Button onClick={()=>setShow(true)} {...props}>
                {children}
            </Button>
            <UpdatePasswordForm show={show} onHide={()=>setShow(false)}/>
        </>
    )
}

UpdatePasswordForm.ShowButton = ShowButton

export default UpdatePasswordForm