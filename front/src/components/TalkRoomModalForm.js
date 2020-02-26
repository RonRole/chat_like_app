import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import ModalForm from './ModalForm';

class Header extends React.Component {
    render() {
        return (
            <strong>おニューの部屋をクリエイション</strong>
        )
    }
}

class Body extends React.Component {
    render () {
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
    
}

class Footer extends React.Component {
    render() {
        return (
            <div>
                <Button className="mr-2" type="submit">つくる</Button>
                <Button variant="secondary" onClick={this.props.onClick}>やめる</Button>    
            </div>   
        )
    }
}

class TalkRoomModalForm extends React.Component {
    render() {
        return (
            <ModalForm  show={this.props.show} 
                        onSubmit={(e) => {
                            e.preventDefault()
                            this.props.onSubmit({
                                title      :e.currentTarget.title.value,
                                description:e.currentTarget.description.value
                            })
                        }}
                        header={<Header />}
                        body={<Body/>}
                        footer={<Footer onClick={this.props.closeModal}/>}
            />
        )
    }
}

export default TalkRoomModalForm