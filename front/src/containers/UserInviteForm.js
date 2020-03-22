import React from "react"
import ModalForm from "../components/ModalForm"
import { IdFormGroup, NameFormGroup } from "../components/UserFormGroups"
import { Button } from "react-bootstrap"

class UserInviteForm extends React.Component {

    render() {
        return (
            <ModalForm
                {...this.props}
                header = {<strong>ユーザーを誘う</strong>}
                body = {<div><IdFormGroup /><NameFormGroup/></div>}
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

export default UserInviteForm