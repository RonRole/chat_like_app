import React from 'react'
const { Tooltip, OverlayTrigger } = require("react-bootstrap")

const Icons = {
    SensorDoor : ({
        className,
        ...props
    }) => {
        return (
            <OverlayTrigger overlay={<Tooltip>入室</Tooltip>}>
                <i className={`material-icons md-48 ${className}`} {...props}>sensor_door</i>
            </OverlayTrigger>
        )
    }
}

export default Icons