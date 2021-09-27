import man from './images/man.png'
import robot from './images/robot.png'
import woman from './images/woman.jpeg'
import mustache from './images/mustache.jpeg'

export const chatPath = (arg) => arg.pathname.split('/chats/').pop()
export const isRobotChat = (arg) => chatPath(arg) === 'Robot'
export const validateEmail = (val) =>
    !regExEmail.test(String(val).toLowerCase())
export const validateBD = (val) => {
    if (val.length === 10) {
        return !regExDB.test(String(val).toLowerCase())
    } else {
        return true
    }
}
export const isExist = (arg) => typeof arg === 'string'
export const textForDelChat = (chats, id) => {
    const chat = chats.find((el) => el.id === id)
    if (!!chat)
        return 'Вы, действительно, хотите удалить чат с ' + chat.name + '?'
    else return 'Вы, действительно, хотите удалить данный чат?'
}
export const getImg = (author) => {
    switch (author) {
        case 'Alexandr':
            return man
        case 'Robot':
            return robot
        case 'Sarah':
            return woman
        case 'Vanya':
            return mustache
        default:
            break
    }
}
export const currTime = (currDate) =>
    ('0' + currDate.getHours()).slice(-2) +
    ':' +
    ('0' + currDate.getMinutes()).slice(-2)
export const messageList = (chats, id) =>
    chats.find((el) => el.name === id).messages
const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regExDB = /(?:19\d{2}|20[01][0-9]|2020|2021)[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])\b/
