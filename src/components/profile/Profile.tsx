import React from 'react';
import avatar from '../../pictures/avatar.jpg'
import { useSelector } from 'react-redux';
import { getProfile } from '../../selectors/profile';
import './profile.scss'
const Profile = () => {
    const profile = useSelector(getProfile)

    return (
        <div className='profile'>
            <img className='profile__img' src={avatar} />
            <ul className='profile__body'>
                <li>
                    {profile.firstName}
                    {profile.lastName}
                </li>
                <li>
                    {profile.age}
                </li>
                <li>
                    {profile.email}
                </li>
            </ul>
        </div>)
}
export default Profile