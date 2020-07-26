import React from 'react'
import styled from 'styled-components'

const FontSize = styled.div`
    font-size:${props=>props.size};

    * {
        font-size:${props=>props.size};
    }
`

FontSize.defaultProps = {
    size: '1.0rem'
}

export default FontSize;