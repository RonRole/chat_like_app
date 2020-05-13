/**
 * UserInviteFormの設計
 * ・ModalFormを使用する
 * ・ModalFormのBodyがメインになる
 * ・
 */
import React from 'react'
import { IdFormGroup, NameFormGroup } from '../components/UserFormGroups'
import ModalForm from '../components/ModalForm'
import { connect } from 'react-redux'

const ModalHeader = () => <strong>ユーザーを誘う</strong>

class SearchedUserField extends React.Component {
    render() {
        <TransitionGroup>
            {[...this.props.searchedUserIds].map(id => this.props.getUserById(id)).filter(e=>e).map((user,index) => {
                return (
                    <CSSTransition key={user.id} classNames="fade" timeout={100}>
                        <div>
                            <h6 style={{textAlign:"center"}}><strong>この人を誘いますか?</strong></h6>
                            <UserProfile className="mb-2" user={user} />
                            <div className="d-flex justify-content-end">
                                <UserInviteButton userId={user.id} talkRoomId={this.props.talkRoomId}/>
                            </div>                                    
                        </div>
                    </CSSTransition>
                )
            })}
        </TransitionGroup>
    }
}

const SearchedUserIds = connect(state => {
    return {
        searchedUserIds : state.users.searchedUserIds
    }
})(SearchedUserField)

class ModalBody extends React.Component {

    render() {
        return (
            <div>
                <IdFormGroup errorMessages={this.props.userInviteErrorMessages} rejectNullOnView/>
                <NameFormGroup errorMessages={this.props.userInviteErrorMessages} rejectNullOnView/>
                <SearchedUserField />
            </div>
        )
    }

}