import React, { useState, useEffect } from 'react'
import { Modal, ListGroup, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import BgmUpdateItem from './BgmLabelFormChanger'
import BgmUploadFormGroup from './BgmUploadFormGroup'
import { Link } from 'react-router-dom'
import SeparateForPagination from '../components/SeparateForPagination'
import SoundActions from '../modules/soundModule/SoundActions'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const BgmManageModal = ({
    onHide,
    show,
    ...props
}) => {
    const bgms = useSelector(state => state.bgms)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!show) {
            dispatch(SoundActions.stopBgm())
        }
    }, [show])
    return (
        <Modal show={show} onHide={onHide} {...props}>
            <Modal.Header closeButton>
                <h6><strong>BGM管理</strong></h6>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <SeparateForPagination itemLengthPerPage={5} WrapWith={TransitionGroup} wrapperClassName='mb-2 clear-exit-anim-children'>
                        {Object.values(bgms).filter(bgm => bgm.id > 0).map((bgm,index) => 
                            <CSSTransition classNames='fade' timeout={100} key={index}>
                                <ListGroup.Item>
                                    <BgmUpdateItem bgm={bgm} className='d-none'/>
                                </ListGroup.Item>
                            </CSSTransition>
                        )}
                    </SeparateForPagination>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <BgmUploadFormGroup />
                <Button variant='secondary' onClick={()=>{
                    onHide()
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
            <BgmManageModal show={showModal} onHide={() => setShowModal(false)} scrollable/>
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
            <BgmManageModal show={showModal} onHide={() => setShowModal(false)} scrollable/>
        </>
    )
}
BgmManageModal.ShowLink = ShowLink

export default BgmManageModal