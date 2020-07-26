import React from 'react'
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RenderByCondition from '../components/RenderByCondition';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9998;
`

const LoadingBackground = styled.div`
    background-color: gray;
    opacity: .5;
    height: 100%;
    width: 100%;
`

const LoadingItem = styled.div`
    font-weight:bold;
    text-shadow:1px 1px 0 black;
    color: white;
    position: fixed;
`
/**
 * stateのloadingが有効な時、画面一杯に広がるローディング画面を表示します
 */
const Loading = () => {
    const loadingState = useSelector(state=>state.loading)

    return (
        <RenderByCondition renderCondition={loadingState > 0}>
            <LoadingWrapper>
                <LoadingBackground/>
                <LoadingItem>
                    <Spinner variant="primary" animation="border"/> 
                    読み込み中です...
                </LoadingItem>
            </LoadingWrapper>
        </RenderByCondition>
    )
}
export default Loading
