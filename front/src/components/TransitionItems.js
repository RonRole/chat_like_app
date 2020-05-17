import React from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"


class TransitionItems extends React.Component {
    render() {
        return (
            <TransitionGroup style={this.props.style} className={this.props.className}>
                {[this.props.children].flat().map((item,index) => {
                    return(
                        <CSSTransition key = {index} timeout={this.props.timeout} classNames={this.props.classNames}>
                            {item}
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        )
    }
}

TransitionItems.defaultProps = {
    children : [],
    timeout : 100,
    classNames : "fade"
}




export default TransitionItems