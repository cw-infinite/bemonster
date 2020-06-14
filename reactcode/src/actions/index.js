
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

export const compareFxForm = (ctx) => {
    return {
        type : 'COMPARE_FX_CONFIG',
        payload : ctx
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

export const editFx = (i, fx) => {
    return {
        type : 'Edit_FX',
        payload : {
            index: i,
            fx
        }
    }
}

// export const editFx = (i, fx) => {
//     return {
//         type : 'Edit_FX',
//         payload : {
//             index: i,
//             fx
//         }
//     }
// }
