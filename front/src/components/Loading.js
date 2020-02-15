import React from 'react'
import { Spinner } from 'react-bootstrap';

class Loading extends React.Component {
    render() {
        return (
            <div style={{height:"100vh"}} id="loading" className="d-flex flex-column justify-content-center align-items-center">
                <Spinner variant="primary" animation="border"/> 
                休憩中よ...      
            </div>
        )
    }
}

export default Loading;