import React from "react"
import ModalForm from "../components/ModalForm"
import { TitleFormGroup, DescriptionFormGroup } from "../components/TalkRoomFormGroups"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { connect } from "react-redux"
import { Button } from "react-bootstrap"

class UpdateTalkRoomForm extends React.Component {
    render() {
        return (
            <ModalForm 
                {...this.props}
                header = {<strong>トークルームをかえる</strong>}
                body = {<div><TitleFormGroup/><DescriptionFormGroup/></div>}
                footer = {
                    <div>
                        <Button className="mr-2" type="submit">かえる</Button>
                        <Button variant="secondary" onClick={this.props.onCancel}>やめる</Button>
                    </div>
                }
                onSubmit = {(e) => {
                    e.preventDefault()
                    this.props.updateTalkRoom({
                        talkRoomId : this.props.talkRoomId,
                        title : e.currentTarget.title.value,
                        description : e.currentTarget.description.value
                    })
                    this.props.onCancel()
                }}        
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTalkRoom : ({
            talkRoomId,
            title,
            description
        }) => {
            dispatch(TalkRoomModule.actions.execUpdateTalkRoom({
                talkRoomId,
                title,
                description
            }))
        }
    }
}

export default connect(null, mapDispatchToProps)(UpdateTalkRoomForm)