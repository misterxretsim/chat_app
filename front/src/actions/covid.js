export const SET_COVID_ARR = 'COVID::SET_COVID_ARR'
export const SET_LOADING_STATUS = 'COVID::SET_LOADING_STATUS'
export const SET_ERROR_STATUS = 'COVID::SET_ERROR_STATUS'

export const setCovidArr = (covidArr) => ({
    type: SET_COVID_ARR,
    payload: {
        covidArr,
    },
})
export const setLoadingStatus = (isLoading) => ({
    type: SET_LOADING_STATUS,
    payload: {
        isLoading,
    },
})
export const setErrorStatus = (error = 'Произошла неизвестная ошибка') => ({
    type: SET_ERROR_STATUS,
    payload: {
        error,
    },
})

export const fetchCovid = (token) => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true))
        fetch('/api/covid', {
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
                dispatch(setCovidArr(rs))
                dispatch(setLoadingStatus(false))
                dispatch(setErrorStatus(null))
            })
            .catch((er) => {
                console.error('error', er)
                dispatch(setErrorStatus())
                dispatch(setLoadingStatus(false))
            })
    }
}
