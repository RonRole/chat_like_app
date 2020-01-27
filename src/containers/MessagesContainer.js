import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import "./MessageContainer.css"

class MessagesContainer extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidUpdate(){
        const messageArea = document.getElementById("messageArea")
        messageArea.scrollTo(0, this.props.messageAreaBottom)
    }

    render() {
        return (
            <Container id = "messageArea">
                <TransitionGroup>
                {this.props.messageComponents.map((component,index) => {
                    return (
                        <CSSTransition key={index} timeout= {100} classNames="fade">
                            {component}
                        </CSSTransition>
                    )
                })}
                </TransitionGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messageComponents: state.messageComps,
        messageAreaBottom: state.messageAreaBottom
    }
}

export default connect(mapStateToProps, null)(MessagesContainer);

