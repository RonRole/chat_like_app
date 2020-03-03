import React from 'react'
import { Button, Container, Alert } from 'react-bootstrap'

class AboutPage extends React.Component {

    OonButton = <Button variant="primary">オォン!</Button>
    OonMessage= <Alert variant="primary">オォン!</Alert>
    AonButton = <Button variant="danger">アォン!</Button>
    AonMessage= <Alert variant="danger">アォン!</Alert>


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