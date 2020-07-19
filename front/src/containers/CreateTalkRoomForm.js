import React, { useState } from 'react'
import ModalForm from '../components/ModalForm'
import { useSelector, useDispatch } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap"
import TalkRoomFormGroups from '../components/TalkRoomFormGroups'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'

/**
 * 
 * @param {boolean} show -true:表示 false:非表示
 * @param {function} closeModalAction -modalを閉じるためのメソッド
 */
const CreateTalkRoomForm = ({
    show = false,
    onHide = () => console.log("on hide"),
    ...props
}) => {
    const loginUser = useSelector(state => state.logStatus.loginUser)　|| {}
    const thisFormError = useSelector(state => state.formErrors.createTalkRoomForm) || {}
    const dispatch = useDispatch()
    return (
        <ModalForm 
            show={show}
            onSubmit = {(e) => {
                e.preventDefault()
                const inputs = e.currentTarget
                dispatch(TalkRoomModule.actions.execAddTalkRoom({
                    title : inputs.title.value,
                    description : inputs.description.value,
                    image       : inputs.image.files[0],
                    authorId : loginUser.id
                }))
                dispatch(FormErrorModule.actions.clearErrorByName('createTalkRoomForm'))
            }}
            onHide={onHide}
            {...props}
        >
            <Modal.Header closeButton>
                <strong>トークルームをつくる</strong>
            </Modal.Header>
            <Modal.Body>
                <TalkRoomFormGroups.Title errorMessages={thisFormError.title}/>
                <TalkRoomFormGroups.Description errorMessages={thisFormError.description}/>
                <TalkRoomFormGroups.Image errorMessages={thisFormError.image} />
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-2" type="submit">つくる</Button>
                <Button variant="secondary" onClick={() => {
                    onHide()
                    dispatch(FormErrorModule.actions.clearErrorByName('createTalkRoomForm'))
                }}>やめる</Button>    
            </Modal.Footer>
        </ModalForm>
    )
}

const ShowIcon = ({
    className,
    ...props
}) => {
    const [createModalShow, changeCreateModalShow] = useState(false);
    return (
        <>
            <OverlayTrigger overlay={<Tooltip>トークルームを追加する</Tooltip>}>
                <i className={`material-icons pointer opacity-under-mouse font-px-30 ${className}`} onClick={()=>{
                    changeCreateModalShow(true)
                }} {...props}>add</i>
            </OverlayTrigger>
            <CreateTalkRoomForm show={createModalShow} onHide={()=>changeCreateModalShow(false)} />
        </>
    )   
}

CreateTalkRoomForm.ShowIcon = ShowIcon

export default CreateTalkRoomForm
