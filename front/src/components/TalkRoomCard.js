import React from "react"
import { Card, Button, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

class TalkRoomCard extends React.Component {
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
                                    <Button variant="danger" onClick={()=> window.confirm(`${this.props.title}を削除しますか?`) ? this.props.destroy(this.props.id) : {}}>消す</Button> 
                                </div>
                            )    
                        })}
                    </Row>
                </Card.Body>
            </Card>
        )

    }
}

export default TalkRoomCard