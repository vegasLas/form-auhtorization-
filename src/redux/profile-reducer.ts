import { InferActionsTypies, BaseThunkType } from './redux-store';
import { authAPI } from './../API/api';
import { user } from "./users-reducer"
import { FormAction } from 'redux-form';

const initialState = {
    profile: {
        id: 1,
        firstName: 'Dangalay',
        lastName: 'Dangalaev',
        email: 'critikk99@bk.ru',
        age: 1,
        companyId: 1
    }
}
type propsType = typeof initialState


export type ActionsType = InferActionsTypies<typeof actions> | FormAction
type ThunkType = BaseThunkType<ActionsType>
const profileReducer = (state = initialState, action: any): propsType => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                profile: action.user
            }
        default:
            return state
    }
}
const actions = {
    setUser: (user: user) => ({
        type: 'SET_USER',
        user: user
    })
}

export const getUserData = (userId: number): ThunkType => async (dispatch) => {
    let res = await authAPI.getUser(userId)
    dispatch(actions.setUser(res.data))
}



export default profileReducer