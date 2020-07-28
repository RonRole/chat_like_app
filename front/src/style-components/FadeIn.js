import React from 'react'
import styled from 'styled-components'

const FadeIn = styled.div`
    @keyframes fade-in {
        0% {
            opacity: 0.0;
        }

        50% {
            opacity: 0.5;
        }

        100% {
            opacity: 1.0;
        }
    }
    animation-name: fade-in;
    animation-duration: ${props=>props.duration}s;
`

FadeIn.defaultProps = {
    duration: 0.5
}

export default FadeIn;