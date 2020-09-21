import { setToken, authAPI } from './../API/api';
import { BaseThunkType, InferActionsTypies } from "./redux-store"
import { FormAction } from 'redux-form';

let updateObjectChild = (object: Array<object>, packId: string, actionId: number, changeKey: any) => {
    return object.map((u: any) => {
        if (u[packId] === actionId) {
            return {
                ...u, ...changeKey
            }
        }
        return u
    })
}

type users = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    companyId: number

}
type companies = {
    id: number,
    name: string,
    description: string
}

let initialState = {
    userid: 1 as number,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    products: [] as Array<any>
}
type initialStateType = typeof initialState
const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "SET_AUTH":
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state;
    }
}

const actions = {
    setAuthUserData: (userid: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: "SET_USER_DATA",
        payload: { userid, email, login, isAuth }
    } as const),
    setAuthProductsData: (isAuth: boolean) => ({
        type: "SET_AUTH",
        isAuth: isAuth
    } as const)
}


type ActionsType = InferActionsTypies<typeof actions> | FormAction
type ThunkType = BaseThunkType<ActionsType>
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let res = await authAPI.getUsers();

}
export const login = (email: string, password: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password);
    if (data.data) {
        window.localStorage.setItem('jwt', data.data.access_token)
        setToken(data.data.access_token)
    }
    dispatch(actions.setAuthProductsData(true))
}
export const logout = (): ThunkType => async (dispatch) => {
    dispatch(actions.setAuthProductsData(false))
    window.localStorage.setItem('jwt', '')
    setToken(null)

}
export const register = (email: string, password: string): ThunkType => async (dispatch) => {
    let data = await authAPI.register(email, password)
    if (data.data) {
        window.localStorage.setItem('jwt', data.data.access_token)
        setToken(data.data.access_token)
    }
    debugger
    dispatch(actions.setAuthProductsData(true))
}

export default authReducer

