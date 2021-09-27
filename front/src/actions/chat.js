export const SET_CHATS = 'CHAT::SET_CHATS'
export const SET_MESSAGES = 'CHAT::SET_MESSAGES'

export const setChats = (chatObj) => ({
    type: SET_CHATS,
    payload: {
        chatObj,
    },
})
export const setMsgs = (chatObjWithMsgs) => ({
    type: SET_MESSAGES,
    payload: {
        chatObjWithMsgs,
    },
})

export const getChats = (token) => {
    return (dispatch) => {
        fetch('/api/chats/all', {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw Error('Something went wrong')
                }
                return response.json()
            })
            .then((rs) => {
                dispatch(setChats(rs))
            })
            .catch((er) => {
                console.error('error', er)
            })
    }
}
export const getChatsWithMessages = (token) => {
    return (dispatch) => {
        fetch('/api/chats', {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw Error('Something went wrong')
                }
                return response.json()
            })
            .then((rs) => {
                dispatch(setMsgs(rs))
            })
            .catch((er) => {
                console.error('error', er)
            })
    }
}
export const addChat = (name, email, token) => {
    const data = { name, email }
    return (dispatch) => {
        fetch('/api/chats/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw Error('Something went wrong')
                }
                return response.json()
            })
            .then((rs) => {
                if (rs.status === 'ok') {
                    dispatch(getChats(token))
                }
            })
            .catch((er) => {
                console.error('error', er)
            })
    }
}
export const deleteChat = (chat_id, token) => {
    return (dispatch) => {
        fetch(`/api/chats/delete?id=${chat_id}`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw Error('Something went wrong')
                }
                return response.json()
            })
            .then((rs) => {
                if (rs.status === 'ok') {
                    dispatch(getChats(token))
                }
            })
            .catch((er) => {
                console.error('error', er)
            })
    }
}
export const addMessage = (
    token,
    chat_id,
    text,
    time,
    profile_owner = 1
) => {
    const data = { id: chat_id, text, time, profile_owner }
    return (dispatch) => {
        fetch('/api/chats/new-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw Error('Something went wrong')
                }
                return response.json()
            })
            .then((rs) => {
                if (rs.status === 'ok') {
                    dispatch(getChatsWithMessages(token))
                }
            })
            .catch((er) => {
                console.error('error', er)
            })
    }
}
