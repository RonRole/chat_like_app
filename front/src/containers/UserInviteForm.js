import React from "react"
import ModalForm from "../components/ModalForm"
import { IdFormGroup, NameFormGroup } from "../components/UserFormGroups"
import { Button, Image } from "react-bootstrap"
import { connect } from "react-redux"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import FormErrorModule from "../modules/FormErrorModule/FormErrorModule"
import UserModule from "../modules/userModule/UserModule"
import UserProfile from "../components/UserProfile"
import { TransitionGroup, CSSTransition } from "react-transition-group"

class UserInviteForm extends React.Component {

    componentDidUpdate() {
        console.log(this.props.state)
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
                                <CSSTransition key={index} classNames="fade" timeout={100}>
                                    <div>
                                        <h6 style={{textAlign:"center"}}><strong>この人を誘いますか?</strong></h6>
                                        <UserProfile user={user} />
                                    </div>
                                </CSSTransition>
                            )
                        })}
                        </TransitionGroup>
                    </div>
                }
                footer = {
                    <div>
                        <Button className="mr-2" onClick ={()=>{
                            this.props.clearErrorMessages()
                            this.props.searchUser({
                                userId : document.forms[0].id.value,
                                userName : document.forms[0].name.value
                            })
                        }}>さがす</Button>
                        <Button variant="secondary" onClick={()=>{
                            this.props.onCancel()
                            this.props.clearSearchedUserIds()
                            this.props.clearErrorMessages()
                        }}>やめる</Button>
                    </div>
                }
                onSubmit = {(e) => {
                    e.preventDefault()
                    this.props.addUserToTalkRoom({
                        userId : e.currentTarget.id.value,
                        talkRoomId : this.props.talkRoomId
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
        addUserToTalkRoom : ({
            userId,
            talkRoomId
        }) => {
            dispatch(TalkRoomModule.actions.execAddUserToTalkRoom({
                userId,
                talkRoomId
            }))
        },
        clearErrorMessages : () => {
            dispatch(FormErrorModule.actions.clearErrorByName("userInviteForm"))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInviteForm)