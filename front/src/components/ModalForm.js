import React from 'react'
import { Modal,　Form } from 'react-bootstrap'

/**
 * Modalで表示するフォーム
 * props {
 *  onsubmit(formEvent),
 *  Header Component,
 *  Body Component,
 *  Footer Component
 * }
 */

const ModalForm = ({
    show,
    onSubmit,
    children
}) => (
    <Modal show={show} size="md" centered>
        <Form onSubmit={(formEvent) => onSubmit(formEvent)}>
            {children}
        </Form>
    </Modal>
)

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
    
