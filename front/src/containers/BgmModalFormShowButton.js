import React, { useState } from 'react'
import BgmModalForm from './BgmModalForm'
import { Button } from 'react-bootstrap'

const BgmModalFormShowButton = ({
    talkRoomId,
    className
}) => {
    const [bgmModalShow, setBgmModalShow] = useState(false)
    return (
        <>
            <Button variant='primary' className={className} onClick={() => {
                setBgmModalShow(true)
            }}>BGM</Button>
            <BgmModalForm show={bgmModalShow} onCancel={()=>setBgmModalShow(false)}/>
        </>
    )
}

export default BgmModalFormShowButton