import { AppReducersType } from './../redux/redux-store';

export const getUsersSel = (state: AppReducersType) => {
    return state.users.users
}