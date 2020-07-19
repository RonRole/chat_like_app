import React, { useState } from "react"
import ModalForm from "../components/ModalForm"
import TalkRoomFormGroups from "../components/TalkRoomFormGroups"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { useSelector, useDispatch } from "react-redux"
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap"

const UpdateTalkRoomForm = ({
    talkRoomId,
    show,
    onHide
}) => {
    const talkRooms = useSelector(state=>state.talkRooms)
    const updateTargetRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default
    const formErrors = useSelector(state=>state.formErrors)
    const updateTalkRoomFormErrors = formErrors["updateTalkRoomForm"] || {title:[], description:[]}
    const dispatch = useDispatch()
    
    return (
        <ModalForm onHide={onHide} show={show} onSubmit = {(e) => {
            e.preventDefault()
            dispatch(TalkRoomModule.actions.execUpdateTalkRoom({
                id : talkRoomId,
                title : e.currentTarget.title.value || updateTargetRoom.title,
                description : e.currentTarget.description.value || updateTargetRoom.description,
                image : e.currentTarget.image.files[0]
            }))
            onHide()
        }}>
            <Modal.Header closeButton>
                <h6><strong>「{updateTargetRoom.title}」のトークルーム情報変更</strong></h6>
            </Modal.Header>
            <Modal.Body>
                <TalkRoomFormGroups.Title errorMessages={updateTalkRoomFormErrors.title} defaultValue={updateTargetRoom.title}/>
                <TalkRoomFormGroups.Description errorMessages={updateTalkRoomFormErrors.description} defaultValue={updateTargetRoom.description}/>
                <TalkRoomFormGroups.Image errorMessages={updateTalkRoomFormErrors.image} defaultValue={updateTargetRoom.image.url} />
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-2" type="submit">かえる</Button>
                <Button variant="secondary" onClick={onHide}>やめる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

const ShowIcon = ({
    talkRoomId,
    className,
    onClick=()=>{},
    ...props
}) => {
    const [updateRoomModalShow, setUpdateRoomModalShow] = useState(false)
    return (
        <>
            <OverlayTrigger overlay={<Tooltip>トークルームを更新する</Tooltip>}>
                <i className={`material-icons pointer opacity-under-mouse font-px-30 ${className}`} onClick={(e)=>{
                    onClick(e)
                    setUpdateRoomModalShow(true)
                }} {...props}>subject</i>
            </OverlayTrigger>
            <UpdateTalkRoomForm talkRoomId={talkRoomId} show = {updateRoomModalShow} onHide = {() => {
                    setUpdateRoomModalShow(false)
                }}
            />
        </>
    )
}

UpdateTalkRoomForm.ShowIcon = ShowIcon

export default UpdateTalkRoomForm

