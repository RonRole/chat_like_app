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
    onHide,
}) => {
    const users = useSelector(state=>state.users)
    const updateTargetUser = users[userId] || users.default
    const formErrors = useSelector(state=>state.formErrors)
    const updateUserFormErrors =  formErrors["updateUserForm"] || {self_id:[], name:[], image:[]}
    const dispatch = useDispatch();
    const filterUpdateParams = (currentUser, userParams) => (
        Object.keys(userParams)
                .filter(param => currentUser[param] !== userParams[param])
                .filter((param) => userParams[param])
                .reduce((result, param) => {
                    result[param] = userParams[param]
                    return result
                }, {})
    )
    return (
        <ModalForm
            show = {show}
            onHide={onHide}
            onSubmit={e => {
                e.preventDefault()
                const inputParams = {
                    self_id: e.currentTarget.id.value,
                    name: e.currentTarget.name.value,
                    image: e.currentTarget.image.files[0]
                }
                const newUserParams = filterUpdateParams(updateTargetUser, inputParams)
                dispatch(UserModule.actions.execUpdateUser({
                    id: userId,
                    ...newUserParams
                }))
            }}
        >
            <Modal.Header closeButton>
                <strong>プロフィール更新</strong>
            </Modal.Header>
            <Modal.Body>
                <UserFormGroups.IdFormGroup defaultValue={updateTargetUser.self_id} errorMessages={updateUserFormErrors.self_id}/>
                <UserFormGroups.NameFormGroup defaultValue={updateTargetUser.name} errorMessages={updateUserFormErrors.name}/>
                <UserFormGroups.ProfileImageFormGroup defaultValue={updateTargetUser.image.profile.url} errorMessages={updateUserFormErrors.image}/>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <Button type='submit' className='mr-2'>更新</Button>
                <Button variant='secondary' onClick={() => {
                    dispatch(FormErrorModule.actions.clearErrorByName("updateUserForm"))
                    onHide()
                }}>やめる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

export default UpdateUserForm