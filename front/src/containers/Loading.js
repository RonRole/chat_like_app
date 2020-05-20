import React from 'react'
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

/**
 * stateのloadingが有効な時、子要素にロード画面をかぶせるコンポーネント
 */
const Loading = ({
    children
}) => {
    const loadingState = useSelector(state=>state.loading)
    if(loadingState === 0) {
        return (
            <div>{children}</div>
        )
    }
    return (
        <div className='loading'>
            <div style={{zIndex:9998,position:"fixed"}} id="loading" className="d-flex justify-content-center align-items-center h-100 w-100">
                <div style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"gray", opacity:"0.5"}}></div>
                <div style={{position:"absolute", fontWeight:"bold", textShadow:"1px 1px 0 black", color:"white"}} className="d-flex flex-column justify-content-center align-items-center">
                    <Spinner variant="primary" animation="border"/> 
                    読み込み中です...
                </div> 
            </div>
            {children}
        </div>
    )

}
export default Loading
