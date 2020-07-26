import React, { useState, useEffect } from 'react'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import styled from 'styled-components';
import Size from '../style-components/Size';

const StyledMap = styled(Map)`
    max-width:${props=>props.width};
    max-height:${props=>props.height};
`

const GoogleMap = ({
    google,
    position,
    width,
    height,
    ...props
}) => {
    return (
        <Size height={height} width={width}>
            <StyledMap
                google = { google }
                center = {{ lat: position.latitude, lng: position.longitude}}
                initialCenter = {{lat: position.latitude, lng: position.longitude}}
                width = {width}
                height = {height}
                {...props}
            >
                <Marker
                    title = { "現在地" }
                    position = {{ lat: position.latitude, lng: position.longitude }}
                />
            </StyledMap>
        </Size>
    )
}

GoogleMap.defaultProps = {
    google : '',
    position : {
        latitude:0, 
        longtitude:0
    },
    width : '80%',
    height: '20%'
}

export default GoogleApiWrapper({
    apiKey:`${process.env.REACT_APP_MAP_API_KEY}`
})(GoogleMap)