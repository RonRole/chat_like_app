import React, { useState, useEffect } from 'react'
import SoundActions from '../modules/soundModule/SoundActions'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import SeparateForPatination from '../components/SeparateForPagination'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import BgmUploadFormGroup from './BgmUploadFormGroup'
import { Link } from 'react-router-dom'


const { useSelector, useDispatch } = require("react-redux")
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
    return (
        <ListGroup className='w-100'>
            <SeparateForPatination itemLengthPerPage = {5} wrapperClassName='mb-2 clear-exit-anim-children' WrapWith={TransitionGroup}>
                {Object.values(bgms).filter(bgm => bgm && bgm.id > 0).map((bgm, index) => (
                    <CSSTransition  key={index} classNames='fade' timeout={100}>
                        <ListGroup.Item className='pointer opacity-iterate w-100' onClick={() => {
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
    onCancel,
    ...props
}) => {
    return (
        <Modal {...props}>
            <Modal.Header>
                <BgmModalFormTitle />
            </Modal.Header>
            <Modal.Body className='d-flex row m-2 overflow-auto'>
                <BgmList talkRoomId={talkRoomId} />
            </Modal.Body>
            <Modal.Footer>
                <BgmUploadFormGroup />
                <Button className='ml-2' variant='secondary'　onClick={onCancel}>やめる</Button>
            </Modal.Footer>
        </Modal>
    )
}

const ShowButton = ({
    talkRoomId,
    ...props
}) => {
    const loginUser = useSelector(state => state.logStatus.loginUser)
    const [bgmModalShow, setBgmModalShow] = useState(false)
    const dispatch = useDispatch()
    return (
        <>
            <Button variant='primary' {...props} onClick={() => {
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId,
                    userId : loginUser.id,
                    status : '♪'
                }))
                setBgmModalShow(true)
            }}>BGM</Button>
            <BgmModalForm scrollable talkRoomId={talkRoomId} show={bgmModalShow} onCancel={()=>{
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId,
                    userId : loginUser.id,
                    status : ''
                }))
                setBgmModalShow(false)
            }}/>
        </>
    )
}

BgmModalForm.ShowButton = ShowButton


const ShowLink = ({
    talkRoomId,
    ...props
}) => {
    const [bgmModalShow, setBgmModalShow] = useState(false)
    const loginUser = useSelector(state => state.logStatus.loginUser)
    const dispatch = useDispatch()
    return (
        <>
            <Link {...props} onClick={() => {
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId,
                    userId : loginUser.id,
                    status : '♪'
                }))
                setBgmModalShow(true)
            }} />
            <BgmModalForm scrollable talkRoomId={talkRoomId} show={bgmModalShow} onCancel={()=>{
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId,
                    userId : loginUser.id,
                    status : ''
                }))
                setBgmModalShow(false)
            }}/>
        </>
    )
}

BgmModalForm.ShowLink = ShowLink



export default BgmModalForm