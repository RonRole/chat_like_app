import React from 'react'
/**
 * マウスホバーされた時に、前面に配置されたコンポーネントを透過し、
 * 後ろに配置されたコンポーネントを表示するコンポーネントです。
 * topComponent:前面に配置するコンポーネント
 * behindComponent:背面に配置するコンポーネント
 */
const Transparent = ({
    children = [],
    className
}) => {
    return (
        <div className={`d-flex ${className}`} style={{alignItems:'center'}}>
            {children}
        </div>                
    )
}

Transparent.Front = ({
    children,
    transParent = false
}) => (
    <div style={{
        zIndex:1, 
        opacity:transParent ? 0.1 : 1.0,
        transition:'all 0.2s ease-out'
    }}>
        {children}
    </div>
)

Transparent.Back = ({
    children
}) => (
    <div style={{zIndex:0, position:'absolute', textAlign:'center'}}>
        {children}
    </div>
)

export default Transparent