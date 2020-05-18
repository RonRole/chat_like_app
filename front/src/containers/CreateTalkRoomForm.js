import React from 'react'
import ModalForm from '../components/ModalForm'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { Button } from "react-bootstrap"
import TalkRoomFormGroups from '../components/TalkRoomFormGroups'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
    
/**
 * TalkRoomFormGroup + ModalForm
 */
class CreateTalkRoomFormComp extends React.Component {
    render() {

        return (
            <ModalForm 
                {...this.props}
                onSubmit = {(e) => {
                    e.preventDefault()
                    this.props.addTalkRoom({
                        title : e.currentTarget.title.value,
                        description : e.currentTarget.description.value,
                        authorId : this.props.loginUser.id
                    })
                    this.props.clearFormErrorMessages()
                }}
            >
                <ModalForm.Header>
                    <strong>トークルームをつくる</strong>
                </ModalForm.Header>
                <ModalForm.Body>
                    <TalkRoomFormGroups.Title errorMessages={this.props.getFormErrorMessagesOf('title')}/>
                    <TalkRoomFormGroups.Description errorMessages={this.props.getFormErrorMessagesOf('description')}/>
                </ModalForm.Body>
                <ModalForm.Footer>
                    <Button className="mr-2" type="submit">つくる</Button>
                    <Button variant="secondary" onClick={this.props.onCancel}>やめる</Button>    
                </ModalForm.Footer>
            </ModalForm>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logStatus.isLoggedIn,
        getFormErrorMessagesOf : paramName => FormErrorModule.reducer.getErrorsOf(state)('createTalkRoomForm')(paramName)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTalkRoom : ({
            title,
            description,
            authorId
        }) => {
            dispatch(TalkRoomModule.actions.execAddTalkRoom({
                title,
                description,
                authorId
            }))
        },
        clearFormErrorMessages : () => dispatch(FormErrorModule.actions.clearErrorByName('createTalkRoomForm'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTalkRoomFormComp)