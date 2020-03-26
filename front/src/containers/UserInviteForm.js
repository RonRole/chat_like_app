import React from "react"
import ModalForm from "../components/ModalForm"
import { IdFormGroup, NameFormGroup } from "../components/UserFormGroups"
import { Button, Image } from "react-bootstrap"
import { connect } from "react-redux"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import FormErrorModule from "../modules/FormErrorModule/FormErrorModule"
import UserModule from "../modules/userModule/UserModule"

class UserInviteForm extends React.Component {

    state = {
        userSearched : 0
    }

    componentDidUpdate() {
        this.setState({
            userSearched : 0
        })
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
                        {[this.state.userSearched].map(id => this.props.getUserById(id)).map((user,index) => {
                            return (
                                <div key={index}>
                                    <h6><strong>この人を追加しますか?</strong></h6>
                                    <div className="d-flex justify-content-center">
                                        <Image className="mr-2" src={`${process.env.REACT_APP_BACKEND_ADDRESS}/${user.image.profile.url}`}/>
                                        <h6><strong>{user.name}</strong></h6>
                                    </div>
                                </div>
                            )
                        })}
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
                            this.setState({userSearched:document.forms[0].id.value})
                        }}>さがす</Button>
                        <Button variant="secondary" onClick={()=>{
                            this.props.onCancel()
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
        loginUser : state.logStatus.isLoggedIn,
        getUserById : userId => UserModule.reducer.getUserById(state)(userId),
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