import React from 'react'
import styled, { css } from 'styled-components'

const SimpleBorder = styled.div`
    ${props => props.position ? css`
        border-${props=>props.position}:1px solid gray;
    ` : css`
        border: 1px solid gray;
    `}
`

export default SimpleBorder