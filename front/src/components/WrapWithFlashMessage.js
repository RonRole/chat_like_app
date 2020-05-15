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
            <Row>
                <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
                    <Alert variant={location.flash.variant}>{location.flash.message}</Alert>
                </Col>
            </Row>
            {children}
        </div>
    )
}

export default withRouter(WrapWithFlashMessage)