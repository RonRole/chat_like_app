import React from 'react'
import ModalForm from '../components/ModalForm'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { Row, Col, Form, Button } from "react-bootstrap"

const Header = () => <strong>おニューの部屋をクリエイション</strong>
const Body = () => {
    return (
        <div>
            <Row className="mb-2">
                <Col md={{span:8,offset:2}}>
                    <Form.Label>タイトル</Form.Label>
                    <Form.Control required type="text" name="title"/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={{span:8,offset:2}}>
                    <Form.Label>説明</Form.Label>
                    <Form.Control required type="text" name="description"/>
                </Col>
            </Row>   
        </div>
    )
}
const Footer = ({
    cancel
}) => {
    return (
        <div>
            <Button className="mr-2" type="submit">つくる</Button>
            <Button variant="secondary" onClick={cancel}>やめる</Button>    
        </div>  
    )
}

class TalkRoomModalForm extends React.Component {

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addTalkRoom({
            title : e.currentTarget.title.value,
            description : e.currentTarget.description.value,
            authorId : this.props.loginUser.id
        })
        this.props.cancel()
    }

    render() {
        return (
            <ModalForm {...this.props}
                        onSubmit={this.onSubmit}
                        header={<Header/>}
                        body={<Body/>}
                        footer={<Footer cancel = {this.props.cancel}/>}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logStatus.isLoggedIn
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
                title : title,
                description : description,
                authorId : authorId
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TalkRoomModalForm)
