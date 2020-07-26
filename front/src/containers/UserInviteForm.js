/**
 *
 */
import React, { useState } from 'react'
import UserFormGroups from '../components/UserFormGroups'
import ModalForm from '../components/ModalForm'
import { useDispatch, useSelector } from 'react-redux'
import UserInviteButton from './UserInviteButton'
import UserModule from '../modules/userModule/UserModule'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import UserProfile from './UserProfile'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import OpacityIterate from '../style-components/OpacityIterate'

const UserInviteForm = ({
    show,
    talkRoomId,
    onHide
}) => {
    const dispatch = useDispatch()
    const searchedUserIds = useSelector(state=>state.users.searchedUserIds)
    const formErrors = useSelector(state=>state.formErrors)
    const userInviteFormError = formErrors["userInviteForm"] || []

    return (
        <ModalForm 
            show={show}
            onHide={onHide}
            onSubmit = {e => {
                e.preventDefault()
                dispatch(FormErrorModule.actions.clearErrorByName('userInviteForm'))
                dispatch(UserModule.actions.execSearchUser({
                    userSelfId : e.currentTarget.id.value,
                    userName : e.currentTarget.name.value
                }))
            }}
        >
            <Modal.Header closeButton>
                <strong>ユーザーを誘う</strong>
            </Modal.Header>
            <Modal.Body>
                <UserFormGroups.IdFormGroup errorMessages={userInviteFormError.messages} required/>
                <UserFormGroups.NameFormGroup errorMessages={userInviteFormError.messages} required/>
                <TransitionGroup>
                    {[...searchedUserIds].filter(e=>e).map((userId) => {
                        return (
                            <CSSTransition key={userId} classNames="fade" timeout={100}>
                                <>
                                    <h6 className='align-text-center'><strong>この人を誘いますか?</strong></h6>
                                    <UserProfile className="mb-2" userId={userId} className='d-flex justify-content-center mb-2' />
                                    <div className="d-flex justify-content-end">
                                        <UserInviteButton userId={userId} talkRoomId={talkRoomId}/>
                                    </div>  
                                </>                                  
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-2" type="submit">さがす</Button>
                <Button variant="secondary" onClick={()=>{
                    onHide()
                    dispatch(UserModule.actions.clearSearchedUsers())
                    dispatch(FormErrorModule.actions.clearErrorByName("userInviteForm"))
                }}>やめる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

const ShowIcon = ({
    talkRoomId,
    onClick = () =>{},
    ...props
}) => {
    const [inviteUserModalShow, setUserInviteModalShow] = useState(false)
    return (
        <>
            <OpacityIterate as='span' {...props}>
                <OverlayTrigger overlay={<Tooltip>ユーザーを追加する</Tooltip>}>
                    <i className='material-icons' onClick={()=>{
                        onClick()
                        setUserInviteModalShow(true)
                    }}>person_add</i>
                </OverlayTrigger>
            </OpacityIterate>
            <UserInviteForm talkRoomId={talkRoomId} show = {inviteUserModalShow} onHide = {() => {
                    setUserInviteModalShow(false)
                }}
            />
        </>
    )
}

UserInviteForm.ShowIcon = ShowIcon

export default UserInviteForm

