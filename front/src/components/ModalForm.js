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
    name,
    children,
    ...props
}) => (
    <Modal show={show} size="md" centered {...props}>
        <Form onSubmit={(formEvent) => onSubmit(formEvent)} name={name}>
            {children}
        </Form>
    </Modal>
)

ModalForm.defaultProps = {
    show : false,
    name : '',
    onSubmit : (e) => {
        console.log('please set onSubmit event')
    }
}

export default ModalForm
    
