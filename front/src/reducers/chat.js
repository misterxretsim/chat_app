import {
    SET_CHATS,
    SET_MESSAGES,
} from '../actions/chat'

export default function reducer(state = [], action) {
    switch (action.type) {
        case SET_CHATS: {
            return { ...state, chats: action.payload.chatObj }
        }
        case SET_MESSAGES: {
            return { ...state, chatsWithMsgs: action.payload.chatObjWithMsgs }
        }
        default:
            return state
    }
}
