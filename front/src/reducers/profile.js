import { SET_PROFILE_OBJECT } from '../actions/profile'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_PROFILE_OBJECT: {
            return action.payload.profileObject
        }
        default:
            return state
    }
}
