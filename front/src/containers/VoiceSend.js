import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { Button } from 'react-bootstrap'
import Visible from '../style-components/Visible'

const RecognitionLangs = {
    JAPANESE : 'ja-JP',
    ENGLISH : 'en-EN'
}

const VoiceSendButton = ({
    talkRoomId,
    ...props
}) => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    const dispatch = useDispatch()

    const [listening, setListening] = useState(false)

    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const currentRoom = currentRoomStatus[talkRoomId] || currentRoomStatus.default
    const translateModes = useSelector(state=>state.translateModes)

    const SpeechRecognition = window.webkitSpeechRecognition
    const recognition = SpeechRecognition ? new SpeechRecognition() : {};
    recognition.lang = RecognitionLangs.JAPANESE
    recognition.continuous = true
    recognition.onresult = (event) => { 
        const recorded = [...event.results].slice(-1)[0]
        dispatch(CurrentRoomStatusModule.actions.submitTextMessage({
            roomId : talkRoomId,
            user : loginUser,
            text : recorded[0].transcript,
            translateMode : translateModes[currentRoom.translateMode]
        }))
    }

    useEffect(() => {
        if(!window.webkitSpeechRecognition){
            return
        }
        if(!listening) {
            recognition.stop()
            return
        }
        recognition.start();
        return () => recognition.stop();
    }, [listening])

    return (
        <Visible aria-hidden={!SpeechRecognition} {...props}>
            <Button onClick={() => setListening(!listening)}>
                {listening ? '音声受付中' : '音声で入力する'}
            </Button>
        </Visible>
    )
}

export default VoiceSendButton