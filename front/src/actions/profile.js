export const SET_PROFILE_OBJECT = 'PROFILE::SET_PROFILE_OBJ'

export const setProfileObject = (profileObject) => ({
    type: SET_PROFILE_OBJECT,
    payload: {
        profileObject,
    },
})

export const changeProfile = (data, token) => {
    return (dispatch) => {
        fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw Error('Something went wrong')
                }
                return response.json()
            })
            .then((rs) => {
                if (rs.status === 'ok') {
                    dispatch(setProfileObject(data))
                }
            })
            .catch((er) => {
                console.error('error', er)
            })
    }
}
