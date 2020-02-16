import React from 'react'
import { Button, Container } from 'react-bootstrap'
import {Variants} from '../modules/TalkRoomMessageModule'

class AboutPage extends React.Component {

    OonButton = <Button variant={Variants.oon}>オォン!</Button>
    OonMessage= <span className={`alert alert-${Variants.oon}`}>オォン!</span>
    AonButton = <Button variant={Variants.aon}>アォン!</Button>
    AonMessage= <span className={`alert alert-${Variants.aon}`}>アォン!</span>


    render(){
        return (
            <Container>
                <h1>About Page</h1>
                <p>{this.OonButton}を押せば{this.OonMessage}</p>
                <p>{this.AonButton}を押せば{this.AonMessage}</p>
                今日も元気に{this.OonMessage}{this.AonMessage}
            </Container>  
        )
    }
}

export default AboutPage