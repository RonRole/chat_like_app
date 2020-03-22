import React from "react"
import ModalForm from "../components/ModalForm"
import { IdFormGroup, NameFormGroup } from "../components/UserFormGroups"
import { Button, Image } from "react-bootstrap"
import { connect } from "react-redux"

class UserInviteForm extends React.Component {

    componentDidMount() {
        console.log(this.props.loginUser)
    }

    render() {
        return (
            <ModalForm
                {...this.props}
                header = {<strong>ユーザーを誘う</strong>}
                body = {
                    <div>
                        <IdFormGroup />
                        <NameFormGroup/>
                        <Image src={`${process.env.REACT_APP_BACKEND_ADDRESS}/${this.props.loginUser.image.profile.url}`}/>
                    </div>
                }
                footer = {
                    <div>
                        <Button className="mr-2" type="submit">さがす</Button>
                        <Button variant="secondary" onClick={this.props.onCancel}>やめる</Button>
                    </div>
                }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logStatus.isLoggedIn,
    }
}

export default connect(mapStateToProps)(UserInviteForm)