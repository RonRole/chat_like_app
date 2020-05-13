import React from 'react'
import { Navbar, Nav, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const spanMap = {
    xs : 5,
    sm : 4,
    md : 3,
    lg : 2
}

const SidebarBody = ({children=[]}) => {
    return (
        <Col xs={{span:spanMap.xs}} 
            sm={{span:spanMap.sm}} 
            md={{span:spanMap.md}}
            lg={{span:spanMap.lg}} 
            className='position-fixed h-100' 
            style={{zIndex:3,paddingRight:0}}>
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark h-100 w-100'>
                <Nav className='navbar-nav' style={{display:'block',height:'100%'}}>
                    {children}
                </Nav>
            </nav>
        </Col>
    )
}

class CursorWhenClosed extends React.Component {
    state = {
        mouseOnOpenCol : false
    }
    render() {
        return (
            <Col className='position-fixed h-100' 
                style={{
                    zIndex:3,
                    width:'40px',
                    opacity : this.state.mouseOnOpenCol ? 0.8 : 1.0
                }}
                onClick={(e) => this.props.onClick(e)}
                onMouseOver={() => this.setState({mouseOnOpenCol:true})}
                onMouseLeave={() => this.setState({mouseOnOpenCol:false})}
            >
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark h-100 w-100 d-flex justify-content-center'>
                    <Nav className='navbar-nav'>
                        <a className='nav-link'>▶</a>
                    </Nav>
                </nav>
            </Col>
        )
    }
}

class CursorWhenOpened extends React.Component {
    state = {
        mouseOnOpenCol : false
    }
    render() {
        return (
            <Col className='position-fixed h-100'
                xs={{offset:spanMap.xs}}
                sm={{offset:spanMap.sm}}
                md={{offset:spanMap.md}}
                lg={{offset:spanMap.lg}}
                style={{
                    zIndex:3,
                    width:'40px',
                    paddingLeft:0,
                    opacity : this.state.mouseOnOpenCol ? 0.8 : 1.0
                }}
                onClick={(e) => this.props.onClick(e)}
                onMouseOver={() => this.setState({mouseOnOpenCol:true})}
                onMouseLeave={() => this.setState({mouseOnOpenCol:false})}
            >
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark h-100 w-100 d-flex justify-content-center'>
                    <Nav className='navbar-nav'>
                        <a className='nav-link'>◀︎</a>
                    </Nav>
                </nav>
            </Col>
        )
    }
}

class Sidebar extends React.Component {

    state = {
        open : false
    }

    render() {
        return (
            <Row>
                {this.state.open ?
                    <div>
                        <SidebarBody>
                            {this.props.children}
                        </SidebarBody>
                        <CursorWhenOpened onClick={() => this.setState({open:false})} />
                    </div>
                : 
                    <CursorWhenClosed onClick={() => this.setState({open:true})} />
                }
            </Row>
        )
    }
}

export default Sidebar