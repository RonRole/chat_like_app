import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-bootstrap'

const SizedImage = styled(Image)`
    height:${props => props.size};
    width:${props => props.size};
`

const UserHeader = ({
    userImageUrl,
    userName,
    imageSize,
    ...props
}) => {
    return (
        <div {...props}>
            <SizedImage src={userImageUrl} size={imageSize} roundedCircle/><strong>{userName}</strong>
        </div>
    )
}

UserHeader.defaultProps = {
    userImageUrl : '',
    userName : '',
    imageSize : '2.5rem'
}

export default UserHeader