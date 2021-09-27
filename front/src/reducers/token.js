import { SET_TOKEN } from '../actions/token'

export default function reducer(state = '', action) {
    switch (action.type) {
        case SET_TOKEN: {
            return action.payload.token
        }
        default:
            return state
    }
}
