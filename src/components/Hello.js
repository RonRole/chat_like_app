import React from 'react'

class Hello extends React.Component {
    constractor(props){
        this.props = props
    }
    render(){
        return (
            <h1>Hello!{this.props.name}</h1>
        )
    }
}

export default Hello;