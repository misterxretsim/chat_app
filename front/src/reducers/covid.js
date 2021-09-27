import {
    SET_COVID_ARR,
    SET_LOADING_STATUS,
    SET_ERROR_STATUS,
} from '../actions/covid'

export default function reducer(state = [], action) {
    switch (action.type) {
        case SET_COVID_ARR: {
            return { ...state, covidArr: action.payload.covidArr }
        }
        case SET_LOADING_STATUS: {
            return { ...state, status: action.payload.isLoading }
        }
        case SET_ERROR_STATUS: {
            return { ...state, error: action.payload.error }
        }
        default:
            return state
    }
}
