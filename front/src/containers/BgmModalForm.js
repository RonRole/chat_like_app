import React, { useState, useEffect } from 'react'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import SeparateForPatination from '../components/SeparateForPagination'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import BgmUploadFormGroup from './BgmUploadFormGroup'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import OpacityIterate from '../style-components/OpacityIterate'


const { useSelector, useDispatch } = require("react-redux")
const { Modal, ListGroup, Form, Button, PageItem, FormGroup } = require("react-bootstrap")

const BgmModalFormTitle = () => {
    return (
        <h6><strong>BGMを選択してください</strong></h6>
    )
}

const BgmListGroup = styled(ListGroup)`
    width : 100%;
`

const BgmList = ({
    talkRoomId
}) => {
    const loginUser = useSelector(state => state.logStatus.loginUser) 
    const dispatch = useDispatch()
    const bgms = useSelector(state => state.bgms)
    return (
        <BgmListGroup>
            <SeparateForPatination itemLengthPerPage = {5} wrapperClassName='mb-2 clear-exit-anim-children' WrapWith={TransitionGroup}>
                {Object.values(bgms).filter(bgm => bgm && bgm.id > 0).map((bgm, index) => (
                    <CSSTransition  key={index} classNames='fade' timeout={100}>
                        <ListGroup.Item onClick={() => {
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
                        }}>
                            <OpacityIterate>
                                {bgm.title}
                            </OpacityIterate>
                        </ListGroup.Item>
                    </CSSTransition>
                ))}
            </SeparateForPatination>
        </BgmListGroup>
    )
}

const BgmModalForm = ({
    talkRoomId,
    onHide,
    ...props
}) => {
    return (
        <Modal onHide={onHide} {...props}>
            <Modal.Header closeButton>
                <BgmModalFormTitle />
            </Modal.Header>
            <Modal.Body className='d-flex row m-2 overflow-auto'>
                <BgmList talkRoomId={talkRoomId} />
            </Modal.Body>
            <Modal.Footer>
                <BgmUploadFormGroup />
                <Button className='ml-2' variant='secondary'　onClick={onHide}>やめる</Button>
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
                    status : 'music_note'
                }))
                setBgmModalShow(true)
            }}>BGM</Button>
            <BgmModalForm scrollable talkRoomId={talkRoomId} show={bgmModalShow} onHide={()=>{
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
                    status : 'music_note'
                }))
                setBgmModalShow(true)
            }} />
            <BgmModalForm scrollable talkRoomId={talkRoomId} show={bgmModalShow} onHide={()=>{
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