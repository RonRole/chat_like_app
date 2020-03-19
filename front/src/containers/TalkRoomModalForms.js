import React from 'react'
import ModalForm from '../components/ModalForm'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { Row, Col, Form, Button } from "react-bootstrap"
import { TitleFormGroup, DescriptionFormGroup } from '../components/TalkRoomFormGroups'
import ModalModule from '../modules/ModalModule/ModalModule'


/**
 * TalkRoomFormGroup + ModalForm
 * 作成も更新も同じフォームでやる
 */

//共通部分
const InputForm = () => {
    return  (
         <div>
            <TitleFormGroup />
            <DescriptionFormGroup />
        </div>
    )
}

class CreateTalkRoomFormComp extends React.Component {

    cancel = () => this.props.closeModalOf("createTalkRoomModalForm")

    render() {
        return (
            <ModalForm
                {...this.props}
                show = {this.props.modalStateOf("createTalkRoomModalForm")}
                header = {<strong>トークルームをつくる</strong>}
                body = {<InputForm />}
                footer = {
                    <div>
                        <Button className="mr-2" type="submit">つくる</Button>
                        <Button variant="secondary" onClick={this.cancel}>やめる</Button>    
                    </div>  
                }
                onSubmit = {(e) => {
                    e.preventDefault()
                    this.props.addTalkRoom({
                        title : e.currentTarget.title.value,
                        description : e.currentTarget.description.value,
                        authorId : this.props.loginUser.id
                    })
                    this.cancel()
                }}
            />
        )
    }
}

class UpdateTalkRoomFormComp extends React.Component {
    cancel = ()=>this.props.closeModalOf("updateTalkRoomModalForm")

    render() {
        return (
            <ModalForm
                {...this.props}
                show = {this.props.modalStateOf("updateTalkRoomModalForm")}
                header = {<strong>トークルームをかえる</strong>}
                body = {<InputForm />}
                footer = {
                    <div>
                        <Button className="mr-2" type="submit">かえる</Button>
                        <Button variant="secondary" onClick={this.cancel}>やめる</Button>    
                    </div>  
                }
                onSubmit = {(e) => {
                    e.preventDefault()
                    this.props.addTalkRoom({
                        title : e.currentTarget.title.value,
                        description : e.currentTarget.description.value,
                        authorId : this.props.loginUser.id
                    })
                    this.cancel()
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logStatus.isLoggedIn,
        modalStateOf : (modalName) => ModalModule.reducer.getModalStateOf(state)(modalName) 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showModalOf : (modalName) => {
            dispatch(ModalModule.actions.showModalOf(modalName))
        },
        closeModalOf : (modalName) => {
            dispatch(ModalModule.actions.closeModalOf(modalName))
        },
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
        }
    }
}

export const CreateTalkRoomForm = connect(mapStateToProps, mapDispatchToProps)(CreateTalkRoomFormComp)
export const UpdateTalkRoomForm = connect(mapStateToProps, mapDispatchToProps)(UpdateTalkRoomFormComp)
