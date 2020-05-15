import React from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Col, Pagination } from "react-bootstrap"


class TransitionItems extends React.Component {
    render() {
        return (
            <TransitionGroup {...this.props.style} {...this.props.className}>
                {[...this.props.children].map((item,index) => {
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