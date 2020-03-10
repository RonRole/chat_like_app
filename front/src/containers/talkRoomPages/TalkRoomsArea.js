import { connect } from "react-redux"

class TalkRoomsArea extends React.Component {

    render() {
        return (
            <TransitionGroup className="row">
                {this.props.talkRoomIds.map((talkRoomId,index) => {
                    return(
                        <CSSTransition key = {index} timeout={100} classNames="fade">
                            <Col key={index} md={{span:4}} className="mt-2">
                                <TalkRoomCard   className  ="col-md-4"
                                                id         ={talkRoomId}
                                                key        ={index} 
                                                readOnly   ={this.props.readOnly}/>  

                            </Col>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        )
    }
}

export default TalkRoomsArea