import React from 'react'
import ModalForm from '../components/ModalForm'
import { useSelector, useDispatch } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { Button } from "react-bootstrap"
import TalkRoomFormGroups from '../components/TalkRoomFormGroups'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'

/**
 * 
 * @param {boolean} show -true:表示 false:非表示
 * @param {function} closeModalAction -modalを閉じるためのメソッド
 */
const CreateTalkRoomForm = ({
    show = false,
    toCloseModalAction = () => console.log('onCancel event')
}) => {

    const loginUser = useSelector(state => state.logStatus.isLoggedIn)　|| {}
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
                    authorId : loginUser.id
                }))
                dispatch(FormErrorModule.actions.clearErrorByName('createTalkRoomForm'))
            }}
        >
            <ModalForm.Header>
                <strong>トークルームをつくる</strong>
            </ModalForm.Header>
            <ModalForm.Body>
                <TalkRoomFormGroups.Title errorMessages={thisFormError.title}/>
                <TalkRoomFormGroups.Description errorMessages={thisFormError.description}/>
            </ModalForm.Body>
            <ModalForm.Footer>
                <Button className="mr-2" type="submit">つくる</Button>
                <Button variant="secondary" onClick={() => {
                    toCloseModalAction()
                    dispatch(FormErrorModule.actions.clearErrorByName('createTalkRoomForm'))
                }}>やめる</Button>    
            </ModalForm.Footer>
        </ModalForm>
    )
}

export default CreateTalkRoomForm
