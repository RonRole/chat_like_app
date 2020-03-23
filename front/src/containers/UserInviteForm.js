import React from "react"
import ModalForm from "../components/ModalForm"
import { IdFormGroup, NameFormGroup } from "../components/UserFormGroups"
import { Button, Image } from "react-bootstrap"
import { connect } from "react-redux"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"

class UserInviteForm extends React.Component {

    componentDidMount() {
        console.log(this.props.loginUser)
    }

    render() {
        return (
            <ModalForm
                {...this.props}
                header = {<strong>ユーザーを誘う</strong>}
                body = {
                    <div>
                        <IdFormGroup />
                        <NameFormGroup/>
                        <Image src={`${process.env.REACT_APP_BACKEND_ADDRESS}/${this.props.loginUser.image.profile.url}`}/>
                    </div>
                }
                footer = {
                    <div>
                        <Button className="mr-2" type="submit">さがす</Button>
                        <Button variant="secondary" onClick={this.props.onCancel}>やめる</Button>
                    </div>
                }
                onSubmit = {(e) => {
                    e.preventDefault()
                    console.log(this.props.talkRoomId)
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserToTalkRoom : ({
            userId,
            talkRoomId
        }) => {
            dispatch(TalkRoomModule.actions.execAddUserToTalkRoom({
                userId,
                talkRoomId
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInviteForm)