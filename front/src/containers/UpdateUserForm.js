import React from 'react'
import ModalForm from '../components/ModalForm'
import { IdFormGroup, NameFormGroup, ProfileImageFormGroup } from '../components/UserFormGroups'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { Button } from 'react-bootstrap'


class UpdateUserForm extends React.Component {


    filterChangedParams(currentUser, userParams) {
        const changedParams = {}
        Object.keys(userParams).filter((param) => {
            return currentUser[param] !== userParams[param]
        }).forEach((param) => {
            changedParams[param] = userParams[param]
        })
        return changedParams
    }

    render() {
        const currentUser = this.props.user
        return (
            <ModalForm
                {...this.props}
                header={<strong>プロフィール更新</strong>}
                body={
                    <div>
                        <IdFormGroup defaultValue={currentUser.self_id} errorMessages={this.props.getErrorMessagesFromFormName('self_id')}/>
                        <NameFormGroup defaultValue={currentUser.name} errorMessages={this.props.getErrorMessagesFromFormName('name')}/>
                        <ProfileImageFormGroup defaultValue={currentUser.image.profile.url} errorMessages={this.props.getErrorMessagesFromFormName('image')}/>
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
                    const newUserParams = this.filterChangedParams(
                        currentUser,
                        {
                            self_id: e.currentTarget.id.value,
                            name: e.currentTarget.name.value,
                            image: e.currentTarget.image.files[0]
                        }
                    )
                    this.props.updateUser({
                        id: currentUser.id,
                        ...newUserParams
                    })
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
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