import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SoundActions from '../modules/soundModule/SoundActions'
import RenderByCondition from '../components/RenderByCondition'

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
            <div className='pointer opacity_iterate w-100' onClick={onClick} {...props}>{bgmTitle}</div>
        </OverlayTrigger>
    )
}
BgmManageItem.Label = BgmLabel

const BgmForm = ({
    onSubmit,
    onCancel,
    bgmId,
    bgmTitle,
    ...props
}) => {
    useEffect(() => {
        document.getElementById(`bgmform_${bgmId}`).focus()
    })
    return (
        <OverlayTrigger overlay={<Tooltip>Returnで更新</Tooltip>}>
            <Form onSubmit={e => onSubmit(e)} {...props}>
                <Form.Control id={`bgmform_${bgmId}`} name='bgm_title' defaultValue={bgmTitle} onBlur={onCancel} required/>
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
    useEffect(() => {
        return stopBgm
    }, [])

    return (
        <>
            <RenderByCondition renderCondition={isPlaying}>
                <OverlayTrigger overlay={<Tooltip>終了</Tooltip>}>
                    <div className='pointer w-100' {...props} onClick={stopBgm}>■</div>
                </OverlayTrigger>
            </RenderByCondition>
            <RenderByCondition renderCondition={!isPlaying}>
                <OverlayTrigger overlay={<Tooltip>再生</Tooltip>}>
                    <div className='pointer w-100' onClick={playBgm} {...props}>▶︎</div>
                </OverlayTrigger>
            </RenderByCondition>
        </>
    )
}
BgmManageItem.PlayCursor = BgmPlayCursor

const BgmDeleteIcon = ({
    bgmId
}) => {
    const dispatch = useDispatch()
    return (
        <OverlayTrigger overlay={<Tooltip>削除</Tooltip>}>
            <div className='pointer' onClick={()=>{
                dispatch(SoundActions.execDeleteBgm({
                    bgmId
                }))
            }}>×</div>
        </OverlayTrigger>
    )
}
BgmManageItem.DeleteIcon = BgmDeleteIcon

export default BgmManageItem