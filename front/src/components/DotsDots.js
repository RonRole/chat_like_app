import React, { useEffect, useState, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RenderByCondition from './RenderByCondition'

const Dot = ({
    left,
    top,
    ...props
}) => {
    return (
        <div className='opacity-under-mouse position-relative pointer bg-green h-10px w-10px rounded-circle' style={{
            left,
            top
        }} {...props} />
    )
}

const DotState = ({
    onClick = () => {},
    ...props
}) => {
    const [left, setLeft] = useState(Math.random()*450)
    const [top, setTop] = useState(Math.random()*450)

    const onDefaultDotClick = () => {
        setLeft(Math.random()*450)
        setTop(Math.random()*450)
    }

    return (
        <Dot left={left} top={top} onClick={()=>{
            onClick()
            onDefaultDotClick()
        }} {...props} />    
    )
}

const CountDown = ({
    initialNumber,
    interrupt,
    start,
    ...props
}) => {
    const [currentNumber, setCurrentNumber] = useState(initialNumber)
    const [countDown, setCountDown] = useState({})

    useEffect(() => {
        const countDown = setTimeout(() => {
            setCurrentNumber(currentNumber-1)
        }, 1000)
        setCountDown(countDown)
        return () => clearTimeout(countDown)
    }, [currentNumber])


    return (
        <div {...props}>
            {currentNumber}
        </div>
    )
}

const Timer = ({
    limitSeconds,
    onTimeUp,
    interrupt,
    onClick = () => {},
    ...props
}) => {
    const [timer, setTimer] = useState({})
    useEffect(() => {
       if(interrupt) {
           clearTimeout(timer)
       }
       return () => clearTimeout(timer)
    }, [interrupt])
    return (
        <Button onClick={() => {
            const tmpTimer = setTimeout(() => {
                alert('おそい!')
                onTimeUp()
            }, limitSeconds*1000)
            setTimer(tmpTimer)
            onClick()
        }} {...props}>START!</Button>
    )
}



const DotsDots = ({
    show,
    onHide,
    ...props
}) => {
    const limitSeconds = 5
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if(show) {
            setCount(0)
            setStarted(false)
        }
    }, [show])

    return (
        <Modal show={show} {...props} onHide={onHide} dialogClassName='w-500px'>
            <Modal.Header closeButton>{`${limitSeconds}秒以内に5回クリック!`}</Modal.Header>
            <Modal.Body className='h-500px m-0 p-0'>
                <div className='h-100 w-100 position-absolute d-flex justify-content-center align-items-center'>
                    <Timer className={started ? 'd-none' : ''} limitSeconds={limitSeconds} onTimeUp={onHide} interrupt={!show} onClick={() => setStarted(true)} />
                </div>
                <RenderByCondition renderCondition={started} className='w-100 h-100 position-absolute font-weight-bold font-x-large d-flex justify-content-center align-items-center'>
                    <CountDown initialNumber={limitSeconds} start={started} interrupt={!show} />
                </RenderByCondition>
                <RenderByCondition renderCondition={started && count < 4}>
                    <DotState onClick={() => {
                        setCount(count+1)
                    }} />
                </RenderByCondition>
                <RenderByCondition renderCondition={count===4}>
                    <DotState onClick={() => {
                        setCount(0)
                        alert('やったね!')
                        onHide()         
                    }}/>  
                </RenderByCondition>
            </Modal.Body>
        </Modal>
    )
}

const ShowLink = ({
    ...props
}) => {
    const [show, setShow] = useState(false)
    return (
        <>
            <Link {...props} onClick={() => setShow(true)}>ぽちぽち</Link>
            <DotsDots show={show} onHide={() => setShow(false)} />
        </>
    )
}

DotsDots.ShowLink = ShowLink

export default DotsDots