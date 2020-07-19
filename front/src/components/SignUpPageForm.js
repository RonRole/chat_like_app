import React from 'react'
import SignUpForm from '../containers/SignUpForm'
import { withRouter } from 'react-router-dom'

const SignUpPageForm = ({history}) => (
    <SignUpForm history={history}/>
)


export default withRouter(SignUpPageForm)