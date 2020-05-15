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
                    {this.props.children}
                </Form>
            </Modal>
        )
    }
}

ModalForm.defaultProps = {
    show : false,
    onSubmit : (e) => {
        console.log('please set onSubmit event')
    }
}

ModalForm.Header = ({
    children = []
}) => (
    <Modal.Header>
        {children}
    </Modal.Header>
)

ModalForm.Body = ({
    children = []
}) => (
    <Modal.Body>
        {children}
    </Modal.Body>
)

ModalForm.Footer = ({
    children = []
}) => (
    <Modal.Footer>
        {children}
    </Modal.Footer>
)

export default ModalForm
    
