import React from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

/**
 * Modalで表示するフォーム
 * props {
 *  onsubmit(formEvent),
 *  Header Component,
 *  Body Component,
 *  Footer Component
 * }
 */
class ModalForm extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} size="md" centered>
                <Form onSubmit={(formEvent) => this.props.onSubmit(formEvent)}>
                    <Modal.Header>
                        <strong>{this.props.header}</strong>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.body}
                    </Modal.Body>

                    <Modal.Footer>
                        {this.props.footer}
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default ModalForm