import React, { useEffect } from 'react'
import logo from '../../pictures/logo.png';
import { NavLink } from 'react-router-dom';
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { getUsersSel } from '../../selectors/users';
import { user } from '../../redux/users-reducer';
import { getIsAuthSel } from '../../selectors/profile';

type propsType = {
    users: Array<user> | null
    auth: boolean
}

const LoggedOutView: React.FC<propsType> = ({ users, auth }) => {
    if (!auth) {
        return <ul>
            <NavLink to='/login' >
                <li>
                    login
                </li>
            </NavLink>

            <NavLink to='/register' >
                <li>
                    register
                </li>
            </NavLink>
        </ul >
    }
    return null
}
const LoggedInView: React.FC<propsType> = ({ auth, users }) => {
    const dispatch = useDispatch()
    const logOutD = dispatch(logout)
    if (auth) {
        return <div>
            <button onClick={() => { dispatch(logOutD) }}>
                Logout
            </button>
        </div>
    }
    return null
}


function Header() {
    const users = useSelector(getUsersSel)
    const auth = useSelector(getIsAuthSel)
    useEffect(() => {

    }, [users])
    return <div className="header">
        <img src={logo} alt="" />
        <LoggedOutView auth={auth} users={users} />
        <LoggedInView auth={auth} users={users} />
    </div>
}


export default Header