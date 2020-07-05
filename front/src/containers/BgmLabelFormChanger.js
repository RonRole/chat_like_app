import React, { useState } from 'react'
import RenderByCondition from '../components/RenderByCondition'
import BgmManageItem from './BgmManageItem'
import { ListGroup, Row, Col } from 'react-bootstrap'

const modeMap = {
    label : 'label',
    form : 'form'
}

const BgmUpdateItem =  ({
    bgm,
}) => {
    const [mode, setMode] = useState(modeMap.label)
    return (
        <Row>
            <RenderByCondition renderCondition={mode===modeMap.label} WrapWith={Col} xs={9} sm={10}>
                <BgmManageItem.Label onClick={() => setMode(modeMap.form)} bgmTitle={bgm.title}/>
            </RenderByCondition>
            <RenderByCondition renderCondition={mode===modeMap.form} WrapWith={Col} xs={9} sm={10}>
                <BgmManageItem.Form onCancel={() => setMode(modeMap.label)} bgmId={bgm.id} bgmTitle={bgm.title}/>
            </RenderByCondition>
                <Col xs={1}><BgmManageItem.PlayCursor bgmSrcUrl={bgm.src.url} bgmId={bgm.id}/></Col>
                <Col xs={1}><BgmManageItem.DeleteIcon bgmId={bgm.id} bgmTitle={bgm.title} /></Col>
        </Row>
    )
}

export default BgmUpdateItem