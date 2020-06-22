import React, { useState, useEffect } from 'react'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const GoogleMap = ({
    google,
    position = {latitude:0, longtitude:0}
}) => {
    return (
        <div id='map'>
            <Map
                className = 'map'
                google = { google }
                center = {{ lat: position.latitude, lng: position.longitude}}
                initialCenter = {{lat: position.latitude, lng: position.longitude}}
            >
                <Marker
                    title = { "現在地" }
                    position = {{ lat: position.latitude, lng: position.longitude }}
                />
            </Map>
        </div>
    )
}   

export default GoogleApiWrapper({
    apiKey:`${process.env.REACT_APP_MAP_API_KEY}`
})(GoogleMap)