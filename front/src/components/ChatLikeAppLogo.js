import React from 'react'
import styled from 'styled-components'

const InlineSpan = styled.span`
    display: inline-block;
`

const LogoTitle = styled.div`
    font-family: "Open sans", sans-serif;
    font-size: 4rem;
    text-align: center;
    line-height: 1;
    letter-spacing: .2em;
    
    @media (max-width:768px) {
        font-size: 1.5rem;
    }
`

const LogoSubTitle = styled.div`
    font-size: 1.1rem;
    margin-top: 2rem;
    text-align: center;
    letter-spacing: .2em;

    @media (max-width:768px) {
        font-size: .8rem;
    }
`

const ChatLikeAppLogo = ({
    ...props
}) => {
    return (
        <h1 {...props}>
            <LogoTitle>
                <InlineSpan>CHAT</InlineSpan> <InlineSpan>LIKE</InlineSpan> <InlineSpan>APP</InlineSpan>
            </LogoTitle>
            <LogoSubTitle>アプリの中で一期一会</LogoSubTitle>
        </h1>
    )
}

export default ChatLikeAppLogo