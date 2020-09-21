import { AppReducersType } from './../redux/redux-store';


export const getProfile = (state: AppReducersType) => {
    return state.profile.profile
}
export const getProfileId = (state: AppReducersType) => {
    return state.profile.profile.id
}
export const getIsAuthSel = (state: AppReducersType) => {
    return state.authreducer.isAuth
}