import React from 'react'
import ModalForm from '../components/ModalForm'
import UserModule from '../modules/userModule/UserModule'
import { useSelector, useDispatch } from 'react-redux'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { Button, Modal } from 'react-bootstrap'
import UserFormGroups from '../components/UserFormGroups'

const UpdateUserForm = ({
    userId,
    show,
    onCancel,
}) => {
    const users = useSelector(state=>state.users)
    const updateTargetUser = users[userId] || users.default
    const formErrors = useSelector(state=>state.formErrors)
    const updateUserFormErrors =  formErrors["updateUserForm"] || {self_id:[], name:[], image:[]}
    const dispatch = useDispatch();
    function filterChangedParams(currentUser, userParams) {
        const changedParams = {}
        Object.keys(userParams).filter((param) => {
            return currentUser[param] !== userParams[param]
        }).forEach((param) => {
            changedParams[param] = userParams[param]
        })
        return changedParams
    }
    function filterNotBlankParams(userParams) {
        const notBlankParams = {}
        Object.keys(userParams)
                .filter((param) => userParams[param])
                .forEach((param) => {
                    notBlankParams[param] = userParams[param]
                })
        return notBlankParams
    }
    return (
        <ModalForm
            show = {show}
            onSubmit={e => {
                e.preventDefault()
                const inputParams = {
                    self_id: e.currentTarget.id.value,
                    name: e.currentTarget.name.value,
                    image: e.currentTarget.image.files[0]
                }
                const newUserParams = filterNotBlankParams(filterChangedParams(updateTargetUser, inputParams))
                dispatch(UserModule.actions.execUpdateUser({
                    id: userId,
                    ...newUserParams
                }))
            }}
        >
            <ModalForm.Header>
                <strong>プロフィール更新</strong>
            </ModalForm.Header>
            <ModalForm.Body>
                <UserFormGroups.IdFormGroup defaultValue={updateTargetUser.self_id} errorMessages={updateUserFormErrors.self_id}/>
                <UserFormGroups.NameFormGroup defaultValue={updateTargetUser.name} errorMessages={updateUserFormErrors.name}/>
                <UserFormGroups.ProfileImageFormGroup defaultValue={updateTargetUser.image.profile.url} errorMessages={updateUserFormErrors.image}/>
            </ModalForm.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <Button type='submit' className='mr-2'>更新</Button>
                <Button variant='secondary' onClick={() => {
                    dispatch(FormErrorModule.actions.clearErrorByName("updateUserForm"))
                    onCancel()
                }}>やめる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

export default UpdateUserForm