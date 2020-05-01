import React from "react"
import { Image, Container } from "react-bootstrap"

const UserProfile = ({
    className = "",
    style = {},
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
    return (
        <Container　className={`${className} d-flex justify-content-center`}>
            <section id="info">
                <div id="loginUserID">
                    <strong style={{borderBottom:"1px solid gray"}}>ユーザーID</strong>
                    <div>{user.self_id}</div>
                </div>
                <div id="loginUserName">
                    <strong style={{borderBottom:"1px solid gray"}}>お名前</strong>
                    <div>{user.name}</div>
                </div>
                {/* <div id="loginUserSecondName">
                    <strong style={{borderBottom:"1px solid gray"}}>二つ名</strong>
                    <div>函館のソクラテス</div>
                </div> */}
            </section>
            <Image style={{objectFit:'contain'}} src={user.image.profile.url} />
        </Container>
    )
}

export default UserProfile