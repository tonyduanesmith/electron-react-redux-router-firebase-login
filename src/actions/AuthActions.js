import app from '../constants/base'
import {
    AUTH_LOADING,
    AUTH_AUTHENTICATED,
    AUTH_CURRENT_USER
} from './types'

export const AuthCheck = () => async dispatch => {
    await app.auth().onAuthStateChanged(user => {
        if (user) {
            dispatch({ type: AUTH_LOADING, payload: false })
            dispatch({ type: AUTH_AUTHENTICATED, payload: true })
            dispatch({ type: AUTH_CURRENT_USER, payload: user })
        } else {
            dispatch({ type: AUTH_LOADING, payload: false })
            dispatch({ type: AUTH_AUTHENTICATED, payload: false })
            dispatch({ type: AUTH_CURRENT_USER, payload: null })
        }
    })
}

export const AuthLogout  = () => async dispatch => {
    try{
        await app.auth().signOut()
            .then(() => {
                dispatch({ type: AUTH_LOADING, payload: false })
                dispatch({ type: AUTH_AUTHENTICATED, payload: false })
                dispatch({ type: AUTH_CURRENT_USER, payload: null })
            })
    }
    catch(err){
        console.log(err)
    }
}

export const AuthLogin = (email, password) => async dispatch => {
    try {
        await dispatch({ type: AUTH_LOADING, payload: true })
        await app
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(result => {
                dispatch({ type: AUTH_AUTHENTICATED, payload: true })
                dispatch({ type: AUTH_CURRENT_USER, payload: result.user })
                dispatch({ type: AUTH_LOADING, payload: false })
            })
            .catch(err => {
                dispatch({ type: AUTH_AUTHENTICATED, payload: false })
                dispatch({ type: AUTH_CURRENT_USER, payload: null })
                dispatch({ type: AUTH_LOADING, payload: false })
            })
    } catch (error) {
        alert(error);
    }
}

export const AuthSignUp = (email, password) => async dispatch => {
    try {
        await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(function (response) {
                if (response.user && response.user.emailVerified === false) {
                    response.user.sendEmailVerification().then(function () {
                        console.log("email verification sent to user")
                    })
                }
                dispatch({ type: AUTH_AUTHENTICATED, payload: true })
                dispatch({ type: AUTH_CURRENT_USER, payload: response.user })
                dispatch({ type: AUTH_LOADING, payload: false })
            })
    } catch (error) {
        alert(error);
    }
}