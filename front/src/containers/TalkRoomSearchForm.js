import React, { useRef, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import RenderByCondition from '../components/RenderByCondition'
import { useDispatch, useSelector } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import OpacityIterate from '../style-components/OpacityIterate'
import styled from 'styled-components'
import FontSize from '../style-components/FontSize'

const TalkRoomSearchForm = {}

const FormTemplate = ({
    onSubmit,
    onSearchOff,
    placeholder,
    formText,
    ...props
}) => {
    const input = useRef(null)
    const submitButton = useRef(null)

    return (
        <Form onSubmit={onSubmit} {...props}>
            <Form.Group>
                <Form.Control ref={input} type='text' placeholder={placeholder} name='searchText' />
                <RenderByCondition renderCondition={formText && formText.length > 0}>
                    <Form.Text>{formText}</Form.Text>
                </RenderByCondition>
            </Form.Group>
            <FontSize as='span' size='2.0rem'>
                <OpacityIterate as='span'>
                    <i className='material-icons' onClick={()=>submitButton.current.click()}>search</i>
                </OpacityIterate>
                <OpacityIterate as='span'>
                    <i className='material-icons' onClick={onSearchOff}>search_off</i>
                </OpacityIterate>
            </FontSize>

            <Button ref={submitButton} type='submit' className='d-none' />
        </Form>
    )
}

const Own = ({
    ...props
}) => {
    const dispatch = useDispatch()
    const onSubmit = e => {
        e.preventDefault()
        dispatch(TalkRoomModule.actions.execSearchOwnRooms({
            q: {
                title_or_description_cont: e.currentTarget.searchText.value
            }
        }))
    }
    const onSearchOff = () => dispatch(TalkRoomModule.actions.execGetOwnRooms())
    return (
        <FormTemplate placeholder='管理ルーム検索' onSubmit={onSubmit} onSearchOff={onSearchOff} {...props}/>
    )
}

TalkRoomSearchForm.Own = Own

const Join = ({
    ...props
}) => {
    const dispatch = useDispatch()
    const onSubmit = e => {
        e.preventDefault()
        dispatch(TalkRoomModule.actions.execSearchJoinRooms({
            q: {
                title_or_description_cont: e.currentTarget.searchText.value
            }
        }))
    }
    const onSearchOff = () => dispatch(TalkRoomModule.actions.execGetJoinedRooms())
    return (
        <FormTemplate placeholder='参加ルーム検索' onSubmit={onSubmit} onSearchOff={onSearchOff} {...props}/>
    )
}

TalkRoomSearchForm.Join = Join

export default TalkRoomSearchForm