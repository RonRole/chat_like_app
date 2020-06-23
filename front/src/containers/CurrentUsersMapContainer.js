import React, { useEffect } from 'react'

import { Container, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import GoogleMap from '../components/GoogleMap'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'

const CurrentUsersMapContainer = ({
    talkRoomId
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const thisRoomStatus = currentRoomStatus[talkRoomId] || currentRoomStatus.default
    const users = useSelector(state=>state.users)
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position=> {
            dispatch(CurrentRoomStatusModule.actions.changeCurrentUserPosition({
                talkRoomId,
                userId: loginUser.id,
                position : {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude
                }
            }))
        }, err => {
            alert(`エラーが発生しました　code:${err.code} ${err.message}`)
        })
    }, [])

    return (
        <Container className='mb-2'>
            <TransitionGroup>
                {[thisRoomStatus.currentUserIds].flat().map((userId,index) => {
                    return (
                        <CSSTransition key={index} timeout={100} classNames="fade">
                            <div className='d-block'>
                                <div>
                                    <Image src = {(users[userId] || users[0]).image.thumb.url} roundedCircle/>
                                    <strong>{(users[userId] || users[0]).name}</strong>
                                </div>
                                <GoogleMap position={(currentRoomStatus[talkRoomId].currentUserPosition || currentRoomStatus.default.currentUserPosition)[userId]}/>
                            </div>
                        </CSSTransition>

                    )
                })}
            </TransitionGroup>
        </Container>
    )
}
export default CurrentUsersMapContainer