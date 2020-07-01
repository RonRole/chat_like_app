import React, { useState, useEffect } from 'react'
import SoundActions from '../modules/soundModule/SoundActions'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import SeparateForPatination from '../components/SeparateForPagination'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import BgmUploadFormGroup from './BgmUploadFormGroup'


const { useSelector, useDispatch } = require("react-redux")
const { default: ModalForm } = require("../components/ModalForm")
const { Modal, ListGroup, Form, Button, PageItem, FormGroup } = require("react-bootstrap")

const BgmModalFormTitle = () => {
    return (
        <h6><strong>BGMを選択してください</strong></h6>
    )
}

const BgmList = ({
    talkRoomId
}) => {
    const loginUser = useSelector(state => state.logStatus.loginUser) 
    const dispatch = useDispatch()
    const bgms = useSelector(state => state.bgms)
    console.log(bgms)
    return (
        <ListGroup className='w-100'>
            <SeparateForPatination itemLengthPerPage = {5} className='mb-2 clear_exit_anim_children' WrapWith={TransitionGroup}>
                {Object.values(bgms).filter(bgm => bgm && bgm.id > 0).map((bgm, index) => (
                    <CSSTransition  key={index} classNames='fade' timeout={100}>
                        <ListGroup.Item className='pointer opacity_iterate w-100' onClick={() => {
                            dispatch(CurrentRoomStatusModule.actions.addMessage({
                                roomId : talkRoomId,
                                messageClass : 'system',
                                user : loginUser,
                                text : `${loginUser.name}さんがBGMを流しました`
                            }))
                            dispatch(CurrentRoomStatusModule.actions.sendMessage({
                                roomId : talkRoomId,
                                messageClass : 'system',
                                user : loginUser,
                                text :`${loginUser.name}さんがBGMを流しました`
                            }))
                            dispatch(CurrentRoomStatusModule.actions.changeRoomBgm({
                                talkRoomId,
                                bgmId : bgm.id,
                                bgmSrcUrl : bgm.src.url
                            }))
                        }}>{bgm.title}</ListGroup.Item>
                    </CSSTransition>
                ))}
            </SeparateForPatination>
        </ListGroup>
    )
}

const BgmModalForm = ({
    talkRoomId,
    show = false,
    onCancel
}) => {
    return (
        <Modal show = {show}>
            <Modal.Header>
                <BgmModalFormTitle />
            </Modal.Header>
            <Modal.Body className='d-flex row m-2 overflow-scroll'>
                <BgmList talkRoomId={talkRoomId} />
            </Modal.Body>
            <Modal.Footer>
                <BgmUploadFormGroup />
                <Button className='ml-2' variant='secondary'　onClick={onCancel}>やめる</Button>
            </Modal.Footer>
        </Modal>
    )
}



export default BgmModalForm