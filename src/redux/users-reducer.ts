import { authAPI } from './../API/api';
import { InferActionsTypies, BaseThunkType } from "./redux-store"
import { FormAction } from "redux-form"


let initialState = {
    users: null as Array<user> | null,

}
export type user = {
    id: number 
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    companyId: number
}
type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'DEl_USERS':
            return {
                ...state,
                users: null
            }
        default:
            return state
    }
}

const actions = {
    setUsers: (users: Array<any>) => ({
        type: "GET_USERS",
        users
    }),
    deltUsers: () => ({
        type: "DEL_USERS",
    }),
    setInitialized: (initialized: boolean) => ({
        type: "SET_INITIALED",
        initialized
    })
}
type ActionsType = InferActionsTypies<typeof actions> | FormAction
type ThunkType = BaseThunkType<ActionsType>

export const getUsers = (): ThunkType => async (dispatch) => {
    let res = await authAPI.getUsers()
    dispatch(actions.setUsers(res.data))
}
export const initializedApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getUsers())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.setInitialized(true))
        })

}
export const createUser = (firstName: string, lastName: string, email: string, age: number, companyId: number): ThunkType => async (dispatch) => {
    let data = await authAPI.createUser(firstName, lastName, email, age, companyId)
    dispatch(getUsers())
}
export const deleteUser = (userId: number): ThunkType => async (dispatch) => {
    let data = await authAPI.delete(userId)
    dispatch(getUsers())
}


export default usersReducer