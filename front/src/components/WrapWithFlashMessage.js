import React from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Alert } from 'react-bootstrap'

const WrapWithFlashMessage = ({
    children,
    location
}) => {
    if(!location.flash){
        return <div>{children}</div>
    }
    return (
        <div>
            <Alert variant={location.flash.variant}>{location.flash.message}</Alert>
            {children}
        </div>
    )
}

export default withRouter(WrapWithFlashMessage)