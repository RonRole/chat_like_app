import React from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import LoginFormWithRouter from './LoginPageForm'
import LoginPageTitle from './LoginPageTitle'
import WrapWithFlashMessage from './WrapWithFlashMessage'

/**
 * ログインページのデザイン設定・配置を行うコンポーネント
 */
class LoginPage extends React.Component {
    render() {
        return (
            <Container>
                <WrapWithFlashMessage>
                    <LoginPageTitle />
                    <LoginFormWithRouter />
                </WrapWithFlashMessage>
            </Container>
        )
    }
}


export default LoginPage