import React from 'react'
import ModalForm from '../components/ModalForm'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { Button } from "react-bootstrap"
import { TitleFormGroup, DescriptionFormGroup } from '../components/TalkRoomFormGroups'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'

/**
 * ModalFormのHeader
 */
const TalkRoomFormHeader = () => (
    <strong>トークルームをつくる</strong>
)

/**
 * ModalFormのBodyコンポーネント
 */
class TalkRoomFormBodyComp extends React.Component {
    render() {
        return (
            <div>
                <TitleFormGroup errorMessages={this.props.getFormErrorMessagesOf('title')}/>
                <DescriptionFormGroup errorMessages={this.props.getFormErrorMessagesOf('description')}/>
            </div>
        )
    }
}

const TalkRoomFormBody = connect(state => {
    return {
        getFormErrorMessagesOf : name => FormErrorModule.reducer.getErrorsOf(state)('createTalkRoomForm')(name)
    }
})(TalkRoomFormBodyComp)

class TalkRoomFormFooter extends React.Component {
    render() {
        return (
            <div>
                <Button className="mr-2" type="submit">つくる</Button>
                <Button variant="secondary" onClick={() => {
                    this.props.onCancel()}
                }>やめる</Button>    
            </div> 
        )
    }
}
    
/**
 * TalkRoomFormGroup + ModalForm
 */
class CreateTalkRoomFormComp extends React.Component {
    render() {
        return (
            <ModalForm
                {...this.props}
                header = {<TalkRoomFormHeader />}
                body = {<TalkRoomFormBody />}
                footer =  {
                    <TalkRoomFormFooter onCancel={() => {
                        this.props.clearFormErrorMessages()
                        this.props.onCancel()
                    }}
                />}
                onSubmit = {(e) => {
                    e.preventDefault()
                    this.props.addTalkRoom({
                        title : e.currentTarget.title.value,
                        description : e.currentTarget.description.value,
                        authorId : this.props.loginUser.id
                    })
                    this.props.clearFormErrorMessages()
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