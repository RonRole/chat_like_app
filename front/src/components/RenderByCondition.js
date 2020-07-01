import { useState } from "react"

import React from 'react'
import { select } from "redux-saga/effects"

/**
 * 子コンポーネントから、そのprops.selectconditionがtrueである
 * 初めのコンポーネントを描画する
 */
const RenderByCondition = ({
    renderCondition,
    children
}) => {
    if(renderCondition) {
        return children
    }
    return <></>
}

export default RenderByCondition