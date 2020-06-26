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
        <div className={`transparent ${className}`}>
            {children}
        </div>                
    )
}

Transparent.Front = ({
    children,
    transParent = false
}) => (
    <div className={`front ${transParent ? 'opacity' : ''}`}>
        {children}
    </div>
)

Transparent.Back = ({
    children
}) => (
    <div className='back'>
        {children}
    </div>
)

export default Transparent