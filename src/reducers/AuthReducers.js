import {
    AUTH_LOADING,
    AUTH_AUTHENTICATED,
    AUTH_CURRENT_USER,
    AUTH_ERROR
} from '../actions/types'

const initialState = {
    loading: false,
    authenticated: false,
    currentUser: null,
    error: ''
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
        case AUTH_ERROR:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}