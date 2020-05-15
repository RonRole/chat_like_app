import React from 'react'
import { Nav, Col } from 'react-bootstrap'

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
                xs={{offset:this.props.offsetMap.xs}}
                sm={{offset:this.props.offsetMap.sm}}
                md={{offset:this.props.offsetMap.md}}
                lg={{offset:this.props.offsetMap.lg}}
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

CursorWhenOpened.defaultProps = {
    offsetMap : {
        xs : 5,
        sm : 4,
        md : 3,
        lg : 2
    }
}

const SidebarCursor = {
    WhenClosed : CursorWhenClosed,
    WhenOpened : CursorWhenOpened
}


export default SidebarCursor