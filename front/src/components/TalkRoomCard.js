import React from "react"
import { Card, Button, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { connect } from "react-redux"


class TalkRoomCard extends React.Component {

    onDestroyButtonClicked = () => {
        if(!window.confirm(`${this.props.title}を削除しますか?`)){
            return
        }
        this.props.destroyTalkRoom(this.props.id)
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                    <Row className="d-md-flex justify-content-end">
                        <Link className="btn btn-primary mr-2" to={`/talk_rooms/${this.props.id}`}>入る</Link>
                        {[this.props.readOnly].filter(readOnly => !readOnly).map((readOnly,index) => {
                            return (
                                <div key={index}>
                                    <Button className="mr-2" variant="success">誘う</Button>
                                    <Button variant="danger" onClick={this.onDestroyButtonClicked}>消す</Button> 
                                </div>
                            )    
                        })}
                    </Row>
                </Card.Body>
            </Card>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        destroyTalkRoom : (talkRoomId) => {
            dispatch(TalkRoomModule.actions.execDeleteTalkRoom(talkRoomId))
        }
    }
}

export default connect(null, mapDispatchToProps)(TalkRoomCard)