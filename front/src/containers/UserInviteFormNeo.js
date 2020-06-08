/**
 * UserInviteFormの設計
 * ・ModalFormを使用する
 * ・ModalFormのBodyがメインになる
 * ・
 */
import React from 'react'
import UserFormGroups from '../components/UserFormGroups'
import ModalForm from '../components/ModalForm'
import { useDispatch, useSelector } from 'react-redux'
import UserInviteButton from './UserInviteButton'
import UserModule from '../modules/userModule/UserModule'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import UserProfile from '../components/UserProfile'
import { Button } from 'react-bootstrap'

const UserInviteForm = ({
    show,
    talkRoomId,
    onCancel
}) => {
    const dispatch = useDispatch()
    const users = useSelector(state=>state.users)
    const searchedUserIds = useSelector(state=>state.users.searchedUserIds)
    const formErrors = useSelector(state=>state.formErrors)
    const userInviteFormError = formErrors["userInviteForm"] || []

    return (
        <ModalForm 
            show={show}
            onSubmit = {e => {
                e.preventDefault()
                dispatch(FormErrorModule.actions.clearErrorByName('userInviteForm'))
                dispatch(UserModule.actions.execSearchUser({
                    userId : e.currentTarget.id.value,
                    userName : e.currentTarget.name.value
                }))
            }}
        >
            <ModalForm.Header>
                <strong>ユーザーを誘う</strong>
            </ModalForm.Header>
            <ModalForm.Body>
                <UserFormGroups.IdFormGroup errorMessages={userInviteFormError.messages} required/>
                <UserFormGroups.NameFormGroup errorMessages={userInviteFormError.messages} required/>
                <TransitionGroup>
                    {[...searchedUserIds].map(id => users[id]).filter(e=>e).map((user) => {
                        return (
                            <CSSTransition key={user.id} classNames="fade" timeout={100}>
                                <div>
                                    <h6 style={{textAlign:"center"}}><strong>この人を誘いますか?</strong></h6>
                                    <UserProfile className="mb-2" user={user} />
                                    <div className="d-flex justify-content-end">
                                        <UserInviteButton userId={user.id} talkRoomId={talkRoomId}/>
                                    </div>                                    
                                </div>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </ModalForm.Body>
            <ModalForm.Footer>
                <Button className="mr-2" type="submit">さがす</Button>
                <Button variant="secondary" onClick={()=>{
                    onCancel()
                    dispatch(UserModule.actions.clearSearchedUsers())
                    dispatch(FormErrorModule.actions.clearErrorByName("userInviteForm"))
                }}>やめる</Button>
            </ModalForm.Footer>
        </ModalForm>
    )
}

export default UserInviteForm

