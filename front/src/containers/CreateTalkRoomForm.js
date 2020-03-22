import React from 'react'
import ModalForm from '../components/ModalForm'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { Row, Col, Form, Button } from "react-bootstrap"
import { TitleFormGroup, DescriptionFormGroup } from '../components/TalkRoomFormGroups'
import ModalModule from '../modules/ModalModule/ModalModule'


/**
 * TalkRoomFormGroup + ModalForm
 */
class CreateTalkRoomFormComp extends React.Component {
    render() {
        return (
            <ModalForm
                {...this.props}
                header = {<strong>トークルームをつくる</strong>}
                body = {<div><TitleFormGroup/><DescriptionFormGroup/></div>}
                footer = {
                    <div>
                        <Button className="mr-2" type="submit">つくる</Button>
                        <Button variant="secondary" onClick={this.props.onCancel}>やめる</Button>    
                    </div>  
                }
                onSubmit = {(e) => {
                    e.preventDefault()
                    this.props.addTalkRoom({
                        title : e.currentTarget.title.value,
                        description : e.currentTarget.description.value,
                        authorId : this.props.loginUser.id
                    })
                    this.props.onCancel()
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTalkRoomFormComp)