import { reducer as formReducer } from 'redux-form'
import { Action, compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import authReducer from './auth-reducer';
import usersReducer from './users-reducer';
import appReducer from './app-reducer';
import profileReducer from './profile-reducer';

let reducers = combineReducers({
    authreducer: authReducer,
    users: usersReducer,
    app: appReducer,
    form: formReducer,
    profile: profileReducer
})
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypies<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

type ReducersType = typeof reducers
export type AppReducersType = ReturnType<ReducersType>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppReducersType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.__store__ = store

export default store