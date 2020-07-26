import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const LinkToSignUpPage = ({
    ...props
}) => {
    return (
        <Link to='/signup' {...props}>新規登録</Link>
    )
}

export default withRouter(LinkToSignUpPage)