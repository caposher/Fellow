// import Axios from "axios";
// var axios = Axios.create({ withCredentials: true });
import { httpService } from './http.service'

const USER_URL = 'http://localhost:3030/api/auth/'


const STORAGE_KEY = 'loggedInUser'

export const userService = {
    login,
    getLoggedInUser,
    logout,
    signup
}

// Debug technique
// window.userService = userService

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

async function login(username, password) {
    try {
        // const user = await httpService.post('auth/login', { username, password })

        // const res = await axios.post(USER_URL + 'login', { username, password })
        // const user = res.data
        // console.log('Got User:', user);
        // const userToSave = JSON.parse(JSON.stringify(user))
        // delete userToSave.password
        // sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userToSave))
        let user
        switch (username) {
            case 'adam':
                user = {
                    "_id": "u103",
                    "fullname": "Adam Bercovich",
                    "username": "adamBerco",
                    "color": "green"
                }
                break
            case 'oshra':
                user = {
                    "_id": "u101",
                    "fullname": "Oshra Hartuv",
                    "username": "oshraHartuv1",
                    "color": "pink"
                }
                break
            case 'osher':
                user = {
                    "_id": "u102",
                    "fullname": "Osher Cappelli",
                    "username": "osherCappelli",
                    "color": "blue"
                }
                break
        }

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    }
    catch (err) {
        console.log('can\'t login', err)
    }
}

async function signup(username, password, fullname) {
    try {
        // const user = await httpService.post('auth/signup', { username, password, fullname })

        // const res = axios.post(USER_URL + '/signup', { username, password, fullname })
        // const user = (await res).data
        // console.log('New user:', user);
        // const userToSave = JSON.parse(JSON.stringify(user))
        // delete userToSave.password
        const user = {
            username,
            password,
            fullname
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userToSave))
        return user
    } catch (err) {
        console.log('can\'t signup', err)
    }
}

async function logout() {
    try {

        // await httpService.post('auth/logout')
        // await axios.post(USER_URL + '/logout')
        sessionStorage.removeItem(STORAGE_KEY)
    } catch (err) {
        console.log('can\'t logout', err)
    }
}