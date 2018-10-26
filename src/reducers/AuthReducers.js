import {
    AUTH_LOADING,
    AUTH_AUTHENTICATED,
    AUTH_CURRENT_USER
} from '../actions/types'

const initialState = {
    loading: true,
    authenticated: false,
    currentUser: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case AUTH_LOADING:
            return{
                ...state,
                loading: action.payload
            }
        case AUTH_AUTHENTICATED:
            return{
                ...state,
                authenticated: action.payload
            }
        case AUTH_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
            }
        default:
            return state
    }
}