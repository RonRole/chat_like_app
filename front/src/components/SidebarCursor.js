import React from 'react'
import { Nav } from 'react-bootstrap'

class CursorWhenClosed extends React.Component {

    state = {
        mouseOnOpenCol : false
    }

    render() {
        return (
            <div className={this.props.className}
                style={{
                    ...this.props.style,
                    opacity : this.state.mouseOnOpenCol ? 0.8 : 1.0,
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
            </div>
        )
    }
}

CursorWhenClosed.defaultProps = {
    className:'h-100',
    style:{}
}

class CursorWhenOpened extends React.Component {
    state = {
        mouseOnOpenCol : false
    }
    render() {
        return (
            <div className={this.props.className}
                style={{
                    ...this.props.style,
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
            </div>
        )
    }
}

CursorWhenOpened.defaultProps = {
    className:'h-100',
    style:{}
}

const SidebarCursor = {
    WhenClosed : CursorWhenClosed,
    WhenOpened : CursorWhenOpened
}


export default SidebarCursor