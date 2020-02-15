import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

class TalkRoomAddingForm extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} size="md" centered>
                <Form onSubmit={(formEvent) => {
                    formEvent.preventDefault()
                    this.props.onSubmit({
                        title:formEvent.currentTarget.title.value,
                        description:formEvent.currentTarget.description.value
                    });
                }}>
                    <Modal.Header>
                        <strong>おニューの部屋をクリエイション!!!</strong>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">つくる</Button>
                        <Button variant="secondary" onClick={this.props.closeModal}>やめる</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default TalkRoomAddingForm