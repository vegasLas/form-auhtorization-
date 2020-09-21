import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { useSelector, useDispatch, connect } from 'react-redux'
import { user, initializedApp, createUser, deleteUser } from '../../redux/users-reducer';
import './users.scss';
import avatar from '../../pictures/avatar.jpg';
import { getUsersSel } from '../../selectors/users'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { AppReducersType } from '../../redux/redux-store'


type propsType = {
    user: user
}
type formData = {
    firstName: string
    lastName: string
    age: number
    email: string
    companyId: number
}
const CreateUserForm: React.FC<InjectedFormProps<formData>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'first name'} name={'firstName'} component={'input'} />
            </div>
            <div>
                <Field placeholder={'last name'} name={'lastName'} component={'input'} />
            </div>
            <div>
                <Field placeholder={'age'} name={'age'} component={'input'} />
            </div>
            <div>
                <Field placeholder={'email'} name={'email'} component={'input'} />
            </div>
            <button>Create user</button>
        </form>
    )
}
const CreateUserReduxForm = reduxForm<formData>({ form: 'createUser' })(CreateUserForm)

const UserInfo: React.FC<propsType> = ({ user }) => {
    const dispatch = useDispatch()
    const deleteUserD = (userId: number) => {
        debugger
        dispatch(deleteUser(userId))
    }
    return (
        <div className="information__content">
            <NavLink to={'/profile/' + user.id} >
                <img src={avatar} alt="" className="information__img" />
            </NavLink>
            <div className="information__content">
                <div className="information__firstname">name: {user.firstName} {user.lastName}</div>
                <div className="information__age">age: {user.age}</div>
                <div className="information__email">email: {user.email}</div>
            </div>
            <button onClick={() => deleteUserD(user.id)}>delete</button>
        </div>
    )
}
type propsTyped = mdtpT
function Users(props: propsTyped) {
    let { createUser } = props
    const [isFetching, setIsFetching] = useState(false)
    const users = useSelector(getUsersSel)
    const dispatch = useDispatch()

    const initializedAppD = () => {
        return dispatch(initializedApp())
    }
    const onSubmit = (formData: formData) => {
        const { firstName, lastName, email, age, companyId } = formData
        createUser(firstName, lastName, email, age, companyId).then(
            () => {
                setIsFetching(false)
            }
        )
    }
    useEffect(() => {
        initializedAppD()
    }, [])
    if (users) {
        return (
            <div className="user">
                <div className="user__body">
                    {isFetching ? <CreateUserReduxForm onSubmit={onSubmit} /> : <button onClick={() => { setIsFetching(true) }}>Add user</button>}
                    <div className="user__information information">
                        {users.map(u =>
                            <UserInfo
                                key={u.id}
                                user={u} />)}
                    </div>
                </div>
            </div>
        )
    }
    return <div>Loading...</div>
}
const mstp = (state: AppReducersType) => ({

})

type mdtpT = {
    createUser: (firstName: string, lastName: string, email: string, age: number, companyId: number) => Promise<any>
}
const UsersContainer = compose<React.ComponentType>(
    connect(mstp, { createUser }),
    withAuthRedirect,
)(Users)

export default UsersContainer