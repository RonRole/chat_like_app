import React from 'react'
const { default: styled } = require("styled-components")

const Size = styled.div`
    height: ${props=>props.height};
    width : ${props=>props.width};

    * {
        height:100%:
        width:100%;
    }
`

export default Size