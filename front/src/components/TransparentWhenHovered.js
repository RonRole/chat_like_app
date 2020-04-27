import React from 'react'
/**
 * マウスホバーされた時に、前面に配置されたコンポーネントを透過し、
 * 後ろに配置されたコンポーネントを表示するコンポーネントです。
 * topComponent:前面に配置するコンポーネント
 * behindComponent:背面に配置するコンポーネント
 */
const TransparentWhenHovered = ({
    frontComponent,
    backComponent
}) => {
    return (
        <div className='d-flex' style={{alignItems:'center'}}>
            <div className='transparent_when_hovered' style={{zIndex:1}}>
                {frontComponent}
            </div>
            <div style={{zIndex:0, position:'absolute', textAlign:'center'}}>
                {backComponent}
            </div>
        </div>                
    )
}

export default TransparentWhenHovered