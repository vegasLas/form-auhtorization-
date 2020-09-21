import React, { useEffect } from 'react'
import { compose } from 'redux'
import { useParams, useHistory } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './Profile'
import { getProfileId } from '../../selectors/profile'
import { getUserData } from '../../redux/profile-reducer'

const ProfileContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const authProfileId = useSelector(getProfileId)

    function getUserProfile(userId: number) {
        return dispatch(getUserData(userId))
    }
    let { userId }: any = useParams()
    function refreshProfile() {
        if (!userId) {
            userId = authProfileId
            if (!userId) {
                history.push('./login')
            }
        }
        else {
            getUserProfile(userId)
        }
    }
    useEffect(() => {
        refreshProfile()
    }, [userId])
    return <Profile />

}

export default compose(
    withAuthRedirect
)(ProfileContainer) as React.ComponentType<any>;