
// Graph Name

export const fetchFxs = () => {
    return {
        type : 'FETCH_FXS'
    }
}

export const submitFxForm = () => {
    return {
        type : 'SUBMIT_FX_CONFIG'
    }
}

export const addFx = () => {
    return {
        type : 'ADD_FX'
    }
}

export const removeFx = (index) => {
    return {
        type : 'REMOVE_FX',
        payload : {
            index
        }
    }
}
