import React, { useState } from 'react'
import RenderByCondition from '../components/RenderByCondition'
import BgmManageItem from './BgmManageItem'
import { ListGroup, Row, Col } from 'react-bootstrap'

const modeMap = {
    label : 'label',
    form : 'form'
}

const LabelFormChanger =  ({
    bgm,
}) => {
    const [mode, setMode] = useState(modeMap.label)
    return (
        <Row>
            <RenderByCondition renderCondition={mode===modeMap.label}>
                <Col xs={10}><BgmManageItem.Label onClick={() => setMode(modeMap.form)} bgmTitle={bgm.title}/></Col>
            </RenderByCondition>
            <RenderByCondition renderCondition={mode===modeMap.form}>
                <Col xs={10}><BgmManageItem.Form onCancel={() => setMode(modeMap.label)} bgmId={bgm.id} bgmTitle={bgm.title}/></Col>
            </RenderByCondition>
                <Col xs={1}><BgmManageItem.PlayCursor bgmSrcUrl={bgm.src.url} bgmId={bgm.id}/></Col>
                <Col xs={1}><BgmManageItem.DeleteIcon bgmId={bgm.id} /></Col>
        </Row>
    )
}

export default LabelFormChanger