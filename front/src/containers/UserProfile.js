import React, { useEffect } from "react"
import { Image, Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import styled from "styled-components"
import UserImage from "./UserImage"
import SimpleBorder from "../style-components/SimpleBorder"
import Size from "../style-components/Size"

const FlexContainer = styled(Container)`
    display: flex;
`

const UserProfile = ({
    without = [],
    userId = 0,
    infoWidth = '30%',
    imageWidth = '70%',
    ...props
}) => {
    const users = useSelector(state=>state.users)
    const profileContents = {}
    profileContents.self_id = (
        <div id="loginUserID">
            <SimpleBorder as='strong' position='bottom'>ユーザーID</SimpleBorder>
            <div>{(users[userId] || users[0]).self_id}</div>
        </div>
    )
    profileContents.name = (
        <div id="loginUserName">
            <SimpleBorder as='strong' position='bottom'>お名前</SimpleBorder>
            <div>{(users[userId] || users[0]).name}</div>
        </div>
    )
    profileContents.image = (
        <UserImage height='10rem' width='10rem' userId={userId} />
    )
    const activeKeys = Object.keys(profileContents).filter(key => !without.includes(key)).reduce((result, key) => {
        result[key] = key
        return result
    }, {})
    return (
        <FlexContainer　{...props}>
            <Size width={infoWidth}>
                {profileContents[activeKeys.self_id]}
                {profileContents[activeKeys.name]}
            </Size>
            <Size width={imageWidth}>
                {profileContents[activeKeys.image]}
            </Size>
        </FlexContainer>
    )
}

export default UserProfile