import React from 'react'
import { Redirect } from "react-router"
import { useSelector } from 'react-redux'
import { getIsAuthSel } from '../selectors/profile'



export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC = (props) => {
        let isAuth = useSelector(getIsAuthSel)
        let { ...restProps } = props
        if (!isAuth) return <Redirect to='/login' />
        return <WrappedComponent {...restProps as WCP} />
    }

    return RedirectComponent
}