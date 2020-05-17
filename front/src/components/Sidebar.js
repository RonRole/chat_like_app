import React from 'react'
import SidebarBody from './SidebarBody'
import SidebarCursor from './SidebarCursor'
import { CSSTransition } from 'react-transition-group'

class Sidebar extends React.Component {

    state = {
        open : false    
    }

    render() {
        return (
            <div>
                <CSSTransition mountOnEnter={true} in={this.state.open} classNames='slide' timeout={0}>
                    <div className='d-flex position-fixed h-100' style={{zIndex:100}}>
                        <SidebarBody>
                            {this.props.children}
                        </SidebarBody>
                        <SidebarCursor.WhenOpened style={{width:'10px'}} onClick={() => this.setState({open:false})}/>
                    </div>
                </CSSTransition>
                {[this.state.open].filter(e=>!e).map((_,index) => (
                    <div className='d-flex position-fixed h-100' style={{zIndex:99}}>
                        <SidebarCursor.WhenClosed style={{width:'10px'}} key={index} onClick={() => this.setState({open:true})}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default Sidebar