import React from "react"
import { Image, Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import styled from "styled-components"
import UserImage from "./UserImage"

const BorderdStrong = styled.strong`
    border-bottom: 1px solid gray;
`

const FlexContainer = styled(Container)`
    display: flex;
`

const UserInfoWrapper = styled.div`
    width: ${props=>props.width};
`
const UserImageWrapper = styled.div`
    width: ${props=>props.width};
`

const UserProfile = ({
    without = [],
    userId = 0,
    infoWidth = '30%',
    imageWidth = '70%',
    ...props
}) => {
    const users = useSelector(state=>state.users)
    const user = users[userId] || users[0]

    const profileContents = {}
    profileContents.self_id = (
        <div id="loginUserID">
            <BorderdStrong>ユーザーID</BorderdStrong>
            <div>{user.self_id}</div>
        </div>
    )
    profileContents.name = (
        <div id="loginUserName">
            <BorderdStrong>お名前</BorderdStrong>
            <div>{user.name}</div>
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
            <UserInfoWrapper width={infoWidth}>
                {profileContents[activeKeys.self_id]}
                {profileContents[activeKeys.name]}
            </UserInfoWrapper>
            <UserImageWrapper width={imageWidth}>
                {profileContents[activeKeys.image]}
            </UserImageWrapper>
        </FlexContainer>
    )
}

export default UserProfile