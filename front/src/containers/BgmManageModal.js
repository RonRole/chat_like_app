import React, { useState } from 'react'
import { Modal, ListGroup, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import LabelFormChanger from './BgmLabelFormChanger'
import BgmUploadFormGroup from './BgmUploadFormGroup'
import { Link } from 'react-router-dom'
import SeparateForPagination from '../components/SeparateForPagination'

const BgmManageModal = ({
    show,
    onCancel
}) => {
    const bgms = useSelector(state => state.bgms)
    return (
        <Modal show={show}>
            <Modal.Header>
                <h6><strong>BGM管理</strong></h6>
            </Modal.Header>
            <Modal.Body>
                <SeparateForPagination itemLengthPerPage={5} WrapWith={ListGroup} className='mb-2'>
                    {Object.values(bgms).filter(bgm => bgm.id > 0).map((bgm,index) => 
                        <ListGroup.Item key={index}>
                            <LabelFormChanger bgm={bgm} className='d-none'/>
                        </ListGroup.Item>
                    )}
                </SeparateForPagination>
            </Modal.Body>
            <Modal.Footer>
                <BgmUploadFormGroup />
                <Button variant='secondary' onClick={()=>{
                    onCancel()
                }}>閉じる</Button>
            </Modal.Footer>
        </Modal>
    )
}

const ShowButton = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Button onClick={() => {
                setShowModal(true)
            }}>BGM管理</Button>
            <BgmManageModal show={showModal} onCancel={() => setShowModal(false)} />
        </>
    )
}
BgmManageModal.ShowButton = ShowButton

const ShowLink = ({
    ...props
}) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Link onClick={() => {
                setShowModal(true)
            }} {...props}>BGM管理</Link>
            <BgmManageModal show={showModal} onCancel={() => setShowModal(false)} />
        </>
    )
}
BgmManageModal.ShowLink = ShowLink

export default BgmManageModal