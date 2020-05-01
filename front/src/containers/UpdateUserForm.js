import React from 'react'
import ModalForm from '../components/ModalForm'
import { IdFormGroup, NameFormGroup, ProfileImageFormGroup } from '../components/UserFormGroups'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { Button } from 'react-bootstrap'


class UpdateUserForm extends React.Component {z

    render() {
        const user = this.props.getUserById(this.props.userId)
        return (
            <ModalForm
                {...this.props}
                header={<strong>プロフィール更新</strong>}
                body={
                    <div>
                        <IdFormGroup defaultValue={user.self_id} errorMessages={this.props.getErrorMessagesFromFormName('self_id')}/>
                        <NameFormGroup defaultValue={user.name} errorMessages={this.props.getErrorMessagesFromFormName('name')}/>
                        <ProfileImageFormGroup defaultValue={user.image.profile.url} errorMessages={this.props.getErrorMessagesFromFormName('image')}/>
                    </div>
                }
                footer={
                    <div className='d-flex justify-content-end'>
                        <Button type='submit' className='mr-2'>更新</Button>
                        <Button variant='secondary' onClick={() => {
                            this.props.clearErrorMessages()
                            this.props.onCancel()
                        }}>やめる</Button>
                    </div>
                }
                onSubmit={(e) => {
                    e.preventDefault()
                    this.props.updateUser({
                        id: this.props.userId,
                        newSelfId: e.currentTarget.id.value,
                        newName: e.currentTarget.name.value,
                        newProfileImage: e.currentTarget.image.files[0]
                    })
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        getUserById : (userId) => UserModule.reducer.getUserById(state)(userId),
        getErrorMessagesFromFormName : (name) => FormErrorModule.reducer.getErrorsOf(state)("updateUserForm")(name)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser : (userParams) => {
            dispatch(UserModule.actions.execUpdateUser(userParams))
        },
        clearErrorMessages : () => {
            dispatch(FormErrorModule.actions.clearErrorByName("updateUserForm"))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm)