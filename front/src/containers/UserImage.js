import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Image } from 'react-bootstrap'

const StyledImage = styled(Image)`
    height:${props=>props.height};
    width:${props=>props.width};
    object-fit:contain;
`
const getImageSrc = ({
    profile,
    thumb
}) => {
    if(profile){
        return user => user.image.profile.url
    }
    if(thumb) {
        return user => user.image.thumb.url
    }
    return user => user.image.url
}

const UserImage = ({
    userId,
    height,
    width,
    profile,
    thumb,
    ...props
}) => {
    const users = useSelector(state => state.users)
    const user = users[userId] || users.default
    const src = getImageSrc({profile, thumb})(user)
    return (
        <StyledImage src={src} height={height} width={width} {...props}/>
    )
}

UserImage.defaultProps = {
    userId:0,
    height:'100px',
    width:'100px'
}

export default UserImage

