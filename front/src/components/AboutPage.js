import React from 'react'
import { Button, Container } from 'react-bootstrap'

class AboutPage extends React.Component {

    OonButton = <Button variant="primary">オォン!</Button>
    OonMessage= <span className={`alert alert-primary`}>オォン!</span>
    AonButton = <Button variant="danger">アォン!</Button>
    AonMessage= <span className={`alert alert-danger`}>アォン!</span>


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