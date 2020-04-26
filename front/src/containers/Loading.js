import React from 'react'
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

export class Loading extends React.Component {
    render() {
        if(!this.props.loading) {
            return <div></div>
        }
        return (
            <div style={{zIndex:9998,position:"fixed"}} id="loading" className="d-flex justify-content-center align-items-center h-100 w-100">
                <div style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"gray", opacity:"0.5"}}></div>
                <div style={{position:"absolute", fontWeight:"bold", textShadow:"1px 1px 0 black", color:"white"}} className="d-flex flex-column justify-content-center align-items-center">
                    <Spinner variant="primary" animation="border"/> 
                    今日もいい天気
                </div>  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading : state.loading
    }
}

export default connect(mapStateToProps)(Loading);
