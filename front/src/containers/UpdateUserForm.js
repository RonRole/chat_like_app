import React from 'react'
import ModalForm from '../components/ModalForm'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { Button, Form, Modal } from 'react-bootstrap'
import UserFormGroups from '../components/UserFormGroups'

/**
 * ユーザー更新用のフォーム部品を設定して配置するコンポーネント
 */
const UpdateUserFormBodyComp = ({defaultUser, getErrorMessagesFromFormName}) => (
    <div>
        <UserFormGroups.IdFormGroup defaultValue={defaultUser.self_id} errorMessages={getErrorMessagesFromFormName('self_id')}/>
        <UserFormGroups.NameFormGroup defaultValue={defaultUser.name} errorMessages={getErrorMessagesFromFormName('name')}/>
        <UserFormGroups.ProfileImageFormGroup defaultValue={defaultUser.image.profile.url} errorMessages={getErrorMessagesFromFormName('image')}/>
    </div>
)

const UpdateUserFormBody = connect(state => {
    return {
        getErrorMessagesFromFormName : (name) => FormErrorModule.reducer.getErrorsOf(state)("updateUserForm")(name)
    }
})(UpdateUserFormBodyComp)

/**
 * ユーザー更新フォームのフッター部分を設定して配置するコンポーネント
 */
const UpdateUserFormFooterComp = ({onCancel, clearErrorMessages}) => (
    <div className='d-flex justify-content-end'>
        <Button type='submit' className='mr-2'>更新</Button>
        <Button variant='secondary' onClick={() => {
            clearErrorMessages()
            onCancel()
        }}>やめる</Button>
    </div>
)

const UpdateUserFormFooter = connect(null, dispatch => {
    return {
        clearErrorMessages : () => {
            dispatch(FormErrorModule.actions.clearErrorByName("updateUserForm"))
        }
    }
})(UpdateUserFormFooterComp)

/**
 * ModalFormにコンポーネントと登録時のメソッドを与えて、
 * ユーザー更新用のフォームを構成するコンポーネント
 */
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

    filterNotBlankParams(userParams) {
        const notBlankParams = {}
        Object.keys(userParams)
                .filter((param) => userParams[param])
                .forEach((param) => {
                    notBlankParams[param] = userParams[param]
                })
        return notBlankParams
    }

    render() {
        return (
            <ModalForm 
                {...this.props} 
                onSubmit={(e) => {
                    e.preventDefault()
                    const inputParams = {
                        self_id: e.currentTarget.id.value,
                        name: e.currentTarget.name.value,
                        image: e.currentTarget.image.files[0]
                    }
                    const newUserParams = this.filterNotBlankParams(this.filterChangedParams(this.props.user, inputParams))
                    this.props.updateUser({
                        id: this.props.user.id,
                        ...newUserParams
                    })
            }}>
                <ModalForm.Header>
                    <strong>プロフィール更新</strong>
                </ModalForm.Header>
                <ModalForm.Body>
                    <UpdateUserFormBody defaultUser={this.props.user}/>
                </ModalForm.Body>
                <ModalForm.Footer>
                    <UpdateUserFormFooter onCancel={this.props.onCancel}/>
                </ModalForm.Footer>
            </ModalForm>
        )
    }
}

export default connect(null, dispatch => {
    return {
        updateUser : (userParams) => {
            dispatch(UserModule.actions.execUpdateUser(userParams))
        }
    }
})(UpdateUserForm)