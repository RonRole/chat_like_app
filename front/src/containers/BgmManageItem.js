import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SoundActions from '../modules/soundModule/SoundActions'
import RenderByCondition from '../components/RenderByCondition'
import OpacityIterate from '../style-components/OpacityIterate'

const { OverlayTrigger, Tooltip, Form } = require("react-bootstrap")
const { useEffect } = require("react")

const BgmManageItem = {}

const BgmLabel = ({
    onClick,
    bgmTitle,
    ...props
}) => {
    return (
        <OverlayTrigger overlay={<Tooltip>クリックでタイトルを変更</Tooltip>}>
            <OpacityIterate {...props} onClick={onClick}>{bgmTitle}</OpacityIterate>
        </OverlayTrigger>
    )
}
BgmManageItem.Label = BgmLabel

const BgmForm = ({
    onCancel,
    bgmId,
    bgmTitle,
    ...props
}) => {
    const dispatch = useDispatch()
    const formRef = useRef(null)
    useEffect(() => {
        formRef.current.focus()
    }, [])
    return (
        <OverlayTrigger overlay={<Tooltip>Returnで更新</Tooltip>}>
            <Form onSubmit={e => {
                e.preventDefault()
                dispatch(SoundActions.execUpdateBgm({
                    bgmId,
                    bgmTitle : e.currentTarget['bgm-title'].value
                }))
                onCancel()
            }} {...props}>
                <Form.Control ref={formRef} id={`bgmform-${bgmId}`} name='bgm-title' defaultValue={bgmTitle} onBlur={onCancel} required/>
            </Form>
        </OverlayTrigger>
    )
}
BgmManageItem.Form = BgmForm

const BgmPlayCursor = ({
    bgmId,
    bgmSrcUrl,
    ...props
}) => {
    const currentBgmId = useSelector(state => state.bgms.currentBgmId)
    const isPlaying = currentBgmId === bgmId
    const dispatch = useDispatch()
    const stopBgm = () => {
        dispatch(SoundActions.stopBgm())
    }
    const playBgm = () => {
        dispatch(SoundActions.startBgm({
            bgmId,
            bgmSrcUrl
        }))
    }

    return (
        <>
            <RenderByCondition renderCondition={isPlaying}>
                <OverlayTrigger overlay={<Tooltip>終了</Tooltip>}>
                    <OpacityIterate onClick={stopBgm}>■</OpacityIterate>
                </OverlayTrigger>
            </RenderByCondition>
            <RenderByCondition renderCondition={!isPlaying}>
                <OverlayTrigger overlay={<Tooltip>再生</Tooltip>}>
                    <OpacityIterate onClick={playBgm} {...props}>▶︎</OpacityIterate>
                </OverlayTrigger>
            </RenderByCondition>
        </>
    )
}
BgmManageItem.PlayCursor = BgmPlayCursor

const BgmDeleteIcon = ({
    bgmId,
    bgmTitle
}) => {
    const dispatch = useDispatch()
    return (
        <OverlayTrigger overlay={<Tooltip>削除</Tooltip>}>
            <OpacityIterate onClick={()=>{
                if(window.confirm(`${bgmTitle}を削除しますか？`)) {
                    dispatch(SoundActions.execDeleteBgm({
                        bgmId
                    }))
                }
            }}>×</OpacityIterate>
        </OverlayTrigger>
    )
}
BgmManageItem.DeleteIcon = BgmDeleteIcon

export default BgmManageItem