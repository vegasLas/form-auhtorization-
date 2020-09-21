import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.scss'


const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <NavLink to='/users'><li>Users</li></NavLink>
                <NavLink to='/profile'><li>Profile</li></NavLink>
            </ul>
        </nav>
    )
}



export default Navbar 