import React from "react"
import ModalForm from "../components/ModalForm"
import TalkRoomFormGroups from "../components/TalkRoomFormGroups"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "react-bootstrap"

const UpdateTalkRoomForm = ({
    talkRoomId,
    show,
    onCancel
}) => {
    const talkRooms = useSelector(state=>state.talkRooms)
    const updateTargetRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default
    const formErrors = useSelector(state=>state.formErrors)
    const updateTalkRoomFormErrors = formErrors["updateTalkRoomForm"] || {title:[], description:[]}
    const dispatch = useDispatch()
    
    return (
        <ModalForm show={show} onSubmit = {(e) => {
            e.preventDefault()
            dispatch(TalkRoomModule.actions.execUpdateTalkRoom({
                talkRoomId,
                title : e.currentTarget.title.value || updateTargetRoom.title,
                description : e.currentTarget.description.value || updateTargetRoom.description
            }))
            onCancel()
        }}>
            <ModalForm.Header>
                <h6><strong>「{updateTargetRoom.title}」のトークルーム情報変更</strong></h6>
            </ModalForm.Header>
            <ModalForm.Body>
                <TalkRoomFormGroups.Title errorMessages={updateTalkRoomFormErrors.title} defaultValue={updateTargetRoom.title}/>
                <TalkRoomFormGroups.Description errorMessages={updateTalkRoomFormErrors.description} defaultValue={updateTargetRoom.description}/>
            </ModalForm.Body>
            <ModalForm.Footer>
                <Button className="mr-2" type="submit">かえる</Button>
                <Button variant="secondary" onClick={onCancel}>やめる</Button>
            </ModalForm.Footer>
        </ModalForm>
    )
}

export default UpdateTalkRoomForm

