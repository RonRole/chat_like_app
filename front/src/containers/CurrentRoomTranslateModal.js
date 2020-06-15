import React, { useState } from 'react'
import { Modal, ListGroup, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
/**
 * 送信するときの翻訳モードを選択するためのモーダル
 */

 const CurrentRoomTranslateModal = ({
    talkRoomId,
    show,
    onCancel
 }) => {
    const currentRoomStatus = useSelector(state => state.currentRoomStatus)
    const safeCurrentRoomStatus = currentRoomStatus[talkRoomId] || currentRoomStatus.default
    const translateModes = currentRoomStatus.translateModes
    const [selectedTranslateMode, setTranslateMode] = useState(safeCurrentRoomStatus.translateMode)
    const dispatch = useDispatch()
    return ( 
        <Modal show={show}>
            <Modal.Header>
                <h6><strong>翻訳モードを選択してください</strong></h6>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {Object.keys(translateModes).map((keyName, index) => (
                        <ListGroup.Item 
                            key = {index}
                            onClick = {() => setTranslateMode(translateModes[keyName])} 
                            active={selectedTranslateMode === translateModes[keyName]}
                        >
                            {translateModes[keyName].modeName}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Body>
                <h6>{selectedTranslateMode.modeTitle}</h6>
                <p>{selectedTranslateMode.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={() => {
                    dispatch(CurrentRoomStatusModule.actions.changeTranslation({
                        talkRoomId,
                        translateMode: selectedTranslateMode
                    }))
                    onCancel()
                }}>決定</Button>
                <Button variant='secondary' onClick={onCancel}>やめる</Button>
            </Modal.Footer>
        </Modal>
    )
 }

 export default CurrentRoomTranslateModal

