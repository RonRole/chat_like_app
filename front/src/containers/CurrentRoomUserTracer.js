import React, { useEffect } from 'react'
import UserPositionModule from '../modules/userPositionModule/UserPositionModule'
import { useSelector, useDispatch } from 'react-redux'

/**
 * ログインユーザーの位置情報を取得し、
 * トークルームに通知する
 */
const CurrentRoomUserTracer = ({
    talkRoomId
}) => {
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position=> {
            dispatch(UserPositionModule.actions.changeCurrentUserPosition({
                talkRoomId,
                userId: loginUser.id,
                position : {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude
                }
            }))
        }, err => {
            console.log(`位置情報の取得でエラーが発生しました　code:${err.code} ${err.message}`)
        })
        navigator.geolocation.watchPosition(position => {
            dispatch(UserPositionModule.actions.changeCurrentUserPosition({
                talkRoomId,
                userId: loginUser.id,
                position : {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude
                }
            }))
        }, err => {
            console.log(err)
        })
    }, [])

    return <></>
}

export default CurrentRoomUserTracer