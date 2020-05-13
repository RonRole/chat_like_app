import React from 'react'
import Loading from './Loading'
import { connect } from 'react-redux'
import LogModule from '../modules/logModule/LogModule'

/**
 * デフォルトログイン(セッションが残っているときに、その情報を利用してログインする)を行うコンポーネント
 * デフォルトログインの状態によって以下に分岐する
 * 完了している => 子要素を表示する
 * 完了していない => 真っ白
 */
class DefaultLoginChecker extends React.Component {
    state = {
        defaultLoginFinished : false
    }
    componentDidMount() {
        this.props.defaultLogin({
          history : this.props.history,
          then : () => this.setState({
            defaultLoginFinished : true
          })
        })
    }
    render() {
        if(!this.state.defaultLoginFinished) {
            return (
                <div></div>
            )
        }
        return (
            this.props.children
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      defaultLogin:({
        history,
        then
      }) => {
        dispatch(LogModule.actions.cookieLogin({
          history,
          then
        }))
      }
    }
}

export default connect(null, mapDispatchToProps)(DefaultLoginChecker)