
// Graph Name

export const fetchFxs = () => {
    return {
        type : 'FETCH_FXS'
    }
}

export const submitFxForm = (ctx) => {
    return {
        type : 'SUBMIT_FX_CONFIG',
        payload : ctx
    }
}

export const updateFxForm = (ctx) => {
    return {
        type : 'UPDATE_FXS',
        payload : ctx
    }
}

