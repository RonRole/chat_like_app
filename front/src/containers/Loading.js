import React from 'react'
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

/**
 * stateのloadingが有効な時、画面一杯に広がるローディング画面を表示します
 */
const Loading = () => {
    const loadingState = useSelector(state=>state.loading)

    return loadingState === 0 ? <div></div> : (
        <div className="loading d-flex justify-content-center align-items-center position-fixed h-100 w-100">
            <div className='loading_background position-absolute h-100 w-100'></div>
            <div className="loading_item position-absolute d-flex flex-column justify-content-center align-items-center">
                <Spinner variant="primary" animation="border"/> 
                読み込み中です...
            </div> 
        </div>
    )
}
export default Loading
