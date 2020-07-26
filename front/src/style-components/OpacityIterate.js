import React from 'react';
import styled from "styled-components";

const OpacityIterate = styled.div`
    cursor: pointer;
    @keyframes opaticy-iterate {
        0% {
            opacity: 1.0;
        }

        50% {
            opacity: 0.5;
        }

        100% {
            opacity: 1.0;
        }
    }
    &:hover {
        animation-name: opacity-iterate;
        animation-duration: 1.0s;
        animation-iteration-count: infinite;
    }
`

export default OpacityIterate;