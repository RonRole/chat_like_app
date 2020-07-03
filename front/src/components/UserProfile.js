import React from "react"
import { Image, Container } from "react-bootstrap"


const UserProfile = ({
    className = "",
    without = [],
    user = {
        id:0,
        name:"",
        image: {
            profile : {
                url:""
            }
        }
    }
}) => {
    const profileContents = {}
    profileContents.self_id = (
        <div id="loginUserID">
            <strong style={{borderBottom:"1px solid gray"}}>ユーザーID</strong>
            <div>{user.self_id}</div>
        </div>
    )
    profileContents.name = (
        <div id="loginUserName">
            <strong style={{borderBottom:"1px solid gray"}}>お名前</strong>
            <div>{user.name}</div>
        </div>
    )
    profileContents.image = (
        <Image style={{objectFit:'contain'}} src={(((user || {}).image || {}).profile || {}).url || ''} />
    )
    

    const activeKeys = Object.keys(profileContents).filter(key => !without.includes(key)).reduce((result, key) => {
        result[key] = key
        return result
    }, {})
    
    return (
        <Container　className={`${className} d-flex justify-content-center`}>
            <section id="info">
                {profileContents[activeKeys.self_id]}
                {profileContents[activeKeys.name]}
            </section>
            {profileContents[activeKeys.image]}
        </Container>
    )
}

export default UserProfile