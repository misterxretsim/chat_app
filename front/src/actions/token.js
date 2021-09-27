export const SET_TOKEN = 'TOKEN::SET_TOKEN'

export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: {
        token,
    },
})
