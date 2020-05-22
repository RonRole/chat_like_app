import React from "react"
import ModalForm from "../components/ModalForm"
import TalkRoomFormGroups from "../components/TalkRoomFormGroups"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { connect } from "react-redux"
import { Button } from "react-bootstrap"
import FormErrorModule from "../modules/FormErrorModule/FormErrorModule"

class UpdateTalkRoomForm extends React.Component {
    render() {
        const talkRoom = this.props.getTalkRoomById(this.props.talkRoomId)
        return (
            <ModalForm 
                {...this.props}
                header = {<strong>トークルームをかえる</strong>}
                body = {
                    <div>
                        <TalkRoomFormGroups.Title errorMessages={this.props.getFormErrorMessagesOf('title')} defaultValue={talkRoom.title}/>
                        <TalkRoomFormGroups.Description errorMessages={this.props.getFormErrorMessagesOf('description')} defaultValue={talkRoom.description}/>
                    </div>
                }
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
                        title : e.currentTarget.title.value || talkRoom.title,
                        description : e.currentTarget.description.value || talkRoom.description
                    })
                    this.props.onCancel()
                }}        
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        getTalkRoomById : (talkRoomId) => TalkRoomModule.reducer.getTalkRoomById(state)(talkRoomId),
        getFormErrorMessagesOf : name => FormErrorModule.reducer.getErrorsOf(state)('updateTalkRoomForm')(name)
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
        },
        clearFormErrorMessages : () => dispatch(FormErrorModule.actions.clearErrorByName('updateTalkRoomForm'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTalkRoomForm)

