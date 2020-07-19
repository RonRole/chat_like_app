import React from 'react'

const ChatLikeAppLogo = ({
    ...props
}) => {
    return (
        <h1 {...props}>
            <div className="logo-title">CHAT LIKE APP</div>
            <div className="logo-subtitle">アプリの中で一期一会</div>
        </h1>
    )
}

export default ChatLikeAppLogo