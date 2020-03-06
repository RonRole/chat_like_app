import React from 'react'
import { Spinner } from 'react-bootstrap';

class Loading extends React.Component {
    render() {
        return (
            <div style={{zIndex:99, height:"100vh", width:"100vw", position:"absolute"}} id="loading" className="d-flex justify-content-center align-items-center">
                <div style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"gray", opacity:"0.5"}}></div>
                <div style={{position:"absolute", fontWeight:"bold", textShadow:"1px 1px 0 black", color:"white"}} className="d-flex flex-column justify-content-center align-items-center">
                    <Spinner variant="primary" animation="border"/> 
                    今日もいい天気
                </div>  
            </div>
        )
    }
}

export default Loading;