import React from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

class TalkRoomCard extends React.Component {
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                    <Link className="btn btn-primary" to={`/talk_rooms/${this.props.id}`}>このトークルームへ行く</Link>
                </Card.Body>
            </Card>
        )

    }
}

export default TalkRoomCard