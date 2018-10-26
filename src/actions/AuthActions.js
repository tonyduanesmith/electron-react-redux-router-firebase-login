import app from '../constants/base'
import {
    AUTH_LOADING,
    AUTH_AUTHENTICATED,
    AUTH_CURRENT_USER,
    AUTH_ERROR
} from './types'
import { history } from '../history'

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
        await dispatch({ type: AUTH_LOADING, payload: false })
        await dispatch({ type: AUTH_AUTHENTICATED, payload: false })
        await dispatch({ type: AUTH_CURRENT_USER, payload: null })
    }
    catch(error){
        console.log(error)
    }
}

export const AuthLogin = (email, password) => async dispatch => {
    try {
        await dispatch({ type: AUTH_LOADING, payload: true })
        const response = await app.auth().signInWithEmailAndPassword(email, password)
        await dispatch({ type: AUTH_AUTHENTICATED, payload: true })
        await dispatch({ type: AUTH_CURRENT_USER, payload: response.user })
        await dispatch({ type: AUTH_ERROR, payload: ''})
        await dispatch({ type: AUTH_LOADING, payload: false })
    } catch (error) {
        await dispatch({ type: AUTH_AUTHENTICATED, payload: false })
        await dispatch({ type: AUTH_CURRENT_USER, payload: null })
        await dispatch({ type: AUTH_ERROR, payload: error.message })
        await dispatch({ type: AUTH_LOADING, payload: false })
    }
}

export const AuthSignUp = (email, password) => async dispatch => {
    try {
        await dispatch({ type: AUTH_LOADING, payload: true })
        const response = await app.auth().createUserWithEmailAndPassword(email.value, password.value)
        if (response.user && response.user.emailVerified === false) {
            await response.user.sendEmailVerification()
        }
        await dispatch({ type: AUTH_AUTHENTICATED, payload: true })
        await dispatch({ type: AUTH_CURRENT_USER, payload: response.user })
        await history.push('/')
        await dispatch({ type: AUTH_LOADING, payload: false })
    } catch (error) {
        await dispatch({ type: AUTH_AUTHENTICATED, payload: false })
        await dispatch({ type: AUTH_CURRENT_USER, payload: null })
        await dispatch({ type: AUTH_ERROR, payload: error.message })
        await dispatch({ type: AUTH_LOADING, payload: false })
    }
}