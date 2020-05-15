/**
 * UserInviteFormの設計
 * ・ModalFormを使用する
 * ・ModalFormのBodyがメインになる
 * ・
 */
import React from 'react'
import UserFormGroups from '../components/UserFormGroups'
import ModalForm from '../components/ModalForm'
import { connect } from 'react-redux'
import UserInviteButton from './UserInviteButton'
import UserModule from '../modules/userModule/UserModule'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import UserProfile from '../components/UserProfile'
import { Button } from 'react-bootstrap'

/**
 * ユーザー勧誘フォーム用のsubmitボタン
 * 
 */

const ModalHeader = () => <strong>ユーザーを誘う</strong>

class SearchedUsersFieldComp extends React.Component {
    render() {
        return (
            <TransitionGroup>
                {[...this.props.searchedUserIds].map(id => this.props.getUserById(id)).filter(e=>e).map((user,index) => {
                    return (
                        <CSSTransition key={user.id} classNames="fade" timeout={100}>
                            <div>
                                <h6 style={{textAlign:"center"}}><strong>この人を誘いますか?</strong></h6>
                                <UserProfile className="mb-2" user={user} />
                                <div className="d-flex justify-content-end">
                                    <UserInviteButton userId={user.id} talkRoomId={this.props.talkRoomId}/>
                                </div>                                    
                            </div>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        )
    }
}

const SearchedUsersField = connect(state => {
    return {
        getUserById : userId => UserModule.reducer.getUserById(state)(userId),
        searchedUserIds : state.users.searchedUserIds
    }
})(SearchedUsersFieldComp)

class ModalBodyComp extends React.Component {

    render() {
        return (
            <div>
                <UserFormGroups.IdFormGroup errorMessages={this.props.userInviteErrorMessages} rejectNullOnView/>
                <UserFormGroups.NameFormGroup errorMessages={this.props.userInviteErrorMessages} rejectNullOnView/>
                <SearchedUsersField talkRoomId={this.props.talkRoomId}/>
            </div>
        )
    }
}

const ModalBody = connect(state => {
    return {
        getUserById : userId => UserModule.reducer.getUserById(state)(userId),
        userInviteErrorMessages : FormErrorModule.reducer.getErrorsOf(state)("userInviteForm")("messages")
    }
})(ModalBodyComp)

class ModalFooterComp extends React.Component {
    render() {
        return (
            <div>
                <Button className="mr-2" type="submit">さがす</Button>
                <Button variant="secondary" onClick={()=>{
                    this.props.onCancel()
                    this.props.clearSearchedUserIds()
                    this.props.clearErrorMessages()
                }}>やめる</Button>
            </div>
        )
    }
}

const ModalFooter = connect(null, dispatch => {
    return {
        clearSearchedUserIds : () => {
            dispatch(UserModule.actions.clearSearchedUsers())
        },
        clearErrorMessages : () => {
            dispatch(FormErrorModule.actions.clearErrorByName("userInviteForm"))
        }
    }
})(ModalFooterComp)

class UserInviteFormNeoComp extends React.Component {
    render() {
        return (
            <ModalForm
                {...this.props}
                header = {<ModalHeader {...this.props}/>}
                body = {<ModalBody talkRoomId={this.props.talkRoomId} {...this.props}/>}
                footer = {<ModalFooter {...this.props}/>}
                onSubmit = {(e) => {
                    e.preventDefault()
                    this.props.clearErrorMessages()
                    this.props.searchUser({
                        userId : e.currentTarget.id.value,
                        userName:e.currentTarget.name.value
                    })
                }}
            />
        )
    }
}

export default connect(null, dispatch => {
    return {
        searchUser : ({
            userId,
            userName
        }) => {
            dispatch(UserModule.actions.execSearchUser({
                userId,
                userName
            }))
        },
        clearErrorMessages : () => {
            dispatch(FormErrorModule.actions.clearErrorByName("userInviteForm"))
        }
    }
})(UserInviteFormNeoComp)

