import { useState } from "react"

import React from 'react'
import { select } from "redux-saga/effects"

/**
 * 子コンポーネントから、そのprops.selectconditionがtrueである
 * 初めのコンポーネントを描画する
 */
const RenderByCondition = ({
    renderCondition,
    children,
    WrapWith,
    ...props
}) => {
    if(renderCondition) {
        return <WrapWith {...props}>{children}</WrapWith>
    }
    return <></>
}

RenderByCondition.defaultProps = {
    WrapWith : 'div'
}

export default RenderByCondition