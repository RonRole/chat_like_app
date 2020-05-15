import React from 'react'
import { Row, Nav } from 'react-bootstrap'
import SidebarBody from './SidebarBody'
import SidebarCursor from './SidebarCursor'

class Sidebar extends React.Component {

    state = {
        open : false
    }

    render() {
        if(this.state.open){
            return (
                <Row>
                    <SidebarBody>
                        {this.props.children}
                    </SidebarBody>
                    <SidebarCursor.WhenOpened onClick={() => this.setState({open:false})}/>
                </Row>
            )
        }
        return (
            <Row>
                <SidebarCursor.WhenClosed onClick={() => this.setState({open:true})}/>
            </Row>
        )
    }
}

Sidebar.Body = SidebarBody
Sidebar.Cursor = SidebarCursor

export default Sidebar