import { InferActionsTypies, BaseThunkType } from './redux-store';
import { FormAction } from 'redux-form';
import { getUsers } from './users-reducer';



const appReducer = (state = {}, action: any) => {
    switch (action.type) {
        case 'SET_INITIALIZED':
            return {
                ...state,
                initialized: action.initialized
            }
        default:
            return state
    }
}

export const actions = {
}

type ActionType = InferActionsTypies<typeof actions> | FormAction
type ThunkType = BaseThunkType<ActionType>



export default appReducer