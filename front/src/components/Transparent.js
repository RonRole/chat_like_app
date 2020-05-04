import React from 'react'
/**
 * マウスホバーされた時に、前面に配置されたコンポーネントを透過し、
 * 後ろに配置されたコンポーネントを表示するコンポーネントです。
 * topComponent:前面に配置するコンポーネント
 * behindComponent:背面に配置するコンポーネント
 */
const Transparent = ({
    frontComponent,
    backComponent,
    transParent=false
}) => {
    return (
        <div className='d-flex' style={{alignItems:'center'}}>
            <div style={{
                zIndex:1, 
                opacity:transParent ? 0.1 : 1.0,
                transition:'all 0.2s ease-out'
            }}>
                {frontComponent}
            </div>
            <div style={{zIndex:0, position:'absolute', textAlign:'center'}}>
                {backComponent}
            </div>
        </div>                
    )
}

export default Transparent