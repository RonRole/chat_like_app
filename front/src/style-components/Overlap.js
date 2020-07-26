import React from 'react'
import styled from 'styled-components'

const Overlap = styled.div`
    display: flex;
    position: relative;
    align-items : ${props => props.alignItems};
    justify-content : ${props => props.justifyContent};
    height : ${props => props.height};
    width : ${props => props.width};
`

Overlap.defaultProps = {
    alignItems : 'center',
    justifyContent : 'center',
    height : '100%',
    width : '100%'
}

Overlap.Item = styled.div`
    position : absolute;
    z-index: ${props => props.zIndex};
`

Overlap.Item.defaultProps = {
    zIndex: 0
}

export default Overlap