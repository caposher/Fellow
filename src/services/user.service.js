// import Axios from "axios";
// var axios = Axios.create({ withCredentials: true });
import { httpService } from './http.service'
import { storageService } from './async-storage.service.js';

const USER_URL = 'http://localhost:3030/api/auth/'

const KEY = 'usersDB'
const STORAGE_KEY = 'loggedInUser'

export const userService = {
    login,
    getLoggedInUser,
    logout,
    signup,
    query
}


function query() {
    return storageService.query(KEY);
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
                    "color": "green",
                    "imgUrl": "https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg"

                }
                break
            case 'oshra':
                user = {
                    "_id": "u101",
                    "fullname": "Oshra Hartuv",
                    "username": "oshraHartuv1",
                    "color": "pink",
                    "imgUrl": "https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg"
                }
                break
            case 'osher':
                user = {
                    "_id": "u102",
                    "fullname": "Osher Cappelli",
                    "username": "osherCappelli",
                    "color": "blue",
                    "imgUrl": "https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg"

                }
                break
            default:
                user = {
                    "_id": "u111",
                    "fullname": username,
                    "username": username,
                }
        }

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    } catch (err) {
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
_createUsers()

function _createUsers() {
    var users = JSON.parse(localStorage.getItem(KEY));
    if (!users || !users.length) {
        users = [
            {
                "fullname": "Adam Bercovich",
                "username": "adamBerco",
                "password": "1234",
                "imgUrl": "https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg"
            },
            {
                "fullname": "Osher Cappelli",
                "username": "osherCappelli",
                "password": "1234",
                "imgUrl": "https://res.cloudinary.com/oshra/image/upload/v1638865093/fefzoaamkdnpvk9pt4sj.jpg"
            },
            {
                "fullname": "Oshra Hartuv",
                "username": "oshraHartuv1",
                "password": "1234",
                "imgUrl": "https://res.cloudinary.com/oshra/image/upload/v1638865116/zlvylnqwvx8bcvp66lpn.jpg"
            },

            {
                "fullname": "Jonathan Peck",
                "username": "lazypeacock761",
                "password": "proxy",
                "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg"
            },
            {
                "fullname": "Robin Woods",
                "username": "bluebird535",
                "password": "deadpool",
                "imgUrl": "https://randomuser.me/api/portraits/women/24.jpg"
            },
            {
                "fullname": "Yvonne Carroll",
                "username": "organicdog552",
                "password": "vantage",
                "imgUrl": "https://randomuser.me/api/portraits/women/41.jpg"
            },
            {
                "fullname": "Jane Hill",
                "username": "yellowladybug184",
                "password": "herewego",
                "imgUrl": "https://randomuser.me/api/portraits/women/18.jpg"
            },
            {
                "fullname": "Daniel Hughes",
                "username": "smallduck899",
                "password": "music1",
                "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
            },
            {
                "fullname": "Ashley Carroll",
                "username": "redswan501",
                "password": "grizzly",
                "imgUrl": "https://randomuser.me/api/portraits/women/21.jpg"
            },
            {
                "fullname": "Peter Hicks",
                "username": "brownbutterfly691",
                "password": "rrrrrr",
                "imgUrl": "https://randomuser.me/api/portraits/men/80.jpg"
            },
            {
                "fullname": "Rick Bailey",
                "username": "silvermouse583",
                "password": "dana",
                "imgUrl": "https://randomuser.me/api/portraits/men/83.jpg"
            },
            {
                "fullname": "Bernard Miller",
                "username": "whiteostrich566",
                "password": "lolo",
                "imgUrl": "https://randomuser.me/api/portraits/men/90.jpg"
            },
            {
                "fullname": "Brandon Bailey",
                "username": "bigpeacock932",
                "password": "mollie",
                "imgUrl": "https://randomuser.me/api/portraits/men/55.jpg"
            }
        ]

        localStorage.setItem(KEY, JSON.stringify(users));
    }
    return users
}