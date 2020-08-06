import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Row, OverlayTrigger, Tooltip } from 'react-bootstrap'
import RenderByCondition from '../components/RenderByCondition'
import { useDispatch, useSelector } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import OpacityIterate from '../style-components/OpacityIterate'
import styled from 'styled-components'
import FontSize from '../style-components/FontSize'
import Size from '../style-components/Size'

const TalkRoomSearchForm = {}

const FormTemplate = ({
    onSubmit,
    onSearchOff,
    placeholder,
    defaultValue,
    formText,
    ...props
}) => {
    const input = useRef(null)
    const submitButton = useRef(null)

    return (
        <Form onSubmit={onSubmit} {...props}>
            <Form.Group>
                <Form.Control ref={input} type='text' placeholder={placeholder} name='searchText' defaultValue={defaultValue} />
                <RenderByCondition renderCondition={formText && formText.length > 0}>
                    <Form.Text>{formText}</Form.Text>
                </RenderByCondition>
            </Form.Group>
            <FontSize as='span' size='2.0rem' className='overflow-hidden d-flex'>
                <OpacityIterate as='div'>
                    <OverlayTrigger overlay={<Tooltip>トークルーム検索</Tooltip>}>
                        <i className='material-icons' onClick={()=>submitButton.current.click()}>search</i>
                    </OverlayTrigger>
                </OpacityIterate>
                <OpacityIterate as='div'>
                    <OverlayTrigger overlay={<Tooltip>検索解除</Tooltip>}>
                        <i className='material-icons' onClick={onSearchOff}>search_off</i>
                    </OverlayTrigger>
                </OpacityIterate>
            </FontSize>
            <Button ref={submitButton} type='submit' className='d-none' />
        </Form>
    )
}

const Own = ({
    ...props
}) => {
    const talkRooms = useSelector(state => state.talkRooms)
    const searchText = talkRooms.searchText.own
    const formText =　searchText ? `「${searchText}」での検索結果:${Object.keys(talkRooms.ownRooms).length}件`:''
    const dispatch = useDispatch()
    const onSubmit = e => {
        e.preventDefault()
        dispatch(TalkRoomModule.actions.execSearchOwnRooms({
            q: {
                title_or_description_cont: e.currentTarget.searchText.value
            }
        }))
    }
    const onSearchOff = () => {
        dispatch(TalkRoomModule.actions.execSearchOwnRooms({
            q: {
                title_or_description_cont:''
            }
        }))
    }
    return (
        <FormTemplate placeholder='管理ルーム検索' onSubmit={onSubmit} onSearchOff={onSearchOff} defaultValue={searchText} formText={formText} defaultValue={searchText} {...props}/>
    )
}

TalkRoomSearchForm.Own = Own

const Join = ({
    ...props
}) => {
    const talkRooms = useSelector(state => state.talkRooms)
    const searchText = talkRooms.searchText.join
    const formText =　searchText ? `「${searchText}」での検索結果:${Object.keys(talkRooms.joinRooms).length}件`:''
    const dispatch = useDispatch()
    const onSubmit = e => {
        e.preventDefault()
        dispatch(TalkRoomModule.actions.execSearchJoinRooms({
            q: {
                title_or_description_cont: e.currentTarget.searchText.value
            }
        }))
    }
    const onSearchOff = () => {
        dispatch(TalkRoomModule.actions.execSearchJoinRooms({
            q: {
                title_or_description_cont:''
            }
        }))
    }
    return (
        <FormTemplate placeholder='参加ルーム検索' onSubmit={onSubmit} onSearchOff={onSearchOff} defaultValue={searchText} formText={formText} defaultValue={searchText} {...props}/>
    )
}

TalkRoomSearchForm.Join = Join

export default TalkRoomSearchForm