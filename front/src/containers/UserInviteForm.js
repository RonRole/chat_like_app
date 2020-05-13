import React from "react"
import ModalForm from "../components/ModalForm"
import { IdFormGroup, NameFormGroup } from "../components/UserFormGroups"
import { Button　} from "react-bootstrap"
import { connect } from "react-redux"
import FormErrorModule from "../modules/FormErrorModule/FormErrorModule"
import UserModule from "../modules/userModule/UserModule"
import UserProfile from "../components/UserProfile"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import UserInviteButton from "./UserInviteButton"

class UserInviteForm extends React.Component {

    checkAlreadyJoined(user) {
        const alreadyInvited = [this.props.getTalkRoomById(this.props.talkRoomId)].flatMap(room => room.userIds).some(userId => userId === user.id)
        return alreadyInvited
    }

    render() {
        return (
            <ModalForm
                {...this.props}
                header = {<strong>ユーザーを誘う</strong>}
                body = {
                    <div>
                        <IdFormGroup　errorMessages={this.props.userInviteErrorMessages}/>
                        <NameFormGroup errorMessages={this.props.userInviteErrorMessages}/>
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
                    </div>
                }
                footer = {
                    <div>
                        <Button className="mr-2" type="submit">さがす</Button>
                        <Button variant="secondary" onClick={()=>{
                            this.props.onCancel()
                            this.props.clearSearchedUserIds()
                            this.props.clearErrorMessages()
                        }}>やめる</Button>
                    </div>
                }
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

const mapStateToProps = (state) => {
    return {
        state,
        loginUser : state.logStatus.isLoggedIn,
        getUserById : userId => UserModule.reducer.getUserById(state)(userId),
        searchedUserIds : state.users.searchedUserIds,
        userInviteErrorMessages : FormErrorModule.reducer.getErrorsOf(state)("userInviteForm")("messages")
    }
}

const mapDispatchToProps = (dispatch) => {
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
        clearSearchedUserIds : () => {
            dispatch(UserModule.actions.clearSearchedUsers())
        },
        clearErrorMessages : () => {
            dispatch(FormErrorModule.actions.clearErrorByName("userInviteForm"))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInviteForm)