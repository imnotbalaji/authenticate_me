import csrfFetch  from "./csrf";
const SETSESSION = 'session/SETSESSION';
const REMOVESESSION = 'session/REMOVESESSION';

// POJO Action creators

// Set the session user in the session slicer ofstate to the action creator's input parameter

const setSession = (user) => ({
    type: SETSESSION,
    user
})

const removeSession = () => ({
    type: REMOVESESSION
})

// THUNK Action creator

export const loginUser = (user) => async (dispatch) => {
    // debugger
    const res = await csrfFetch('/api/session', {method: 'POST', body: JSON.stringify(user)});
    // debugger
    const data = await res.json();
    dispatch(setSession(data))
    

}

export const logoutUser = () => async(dispatch) => {
    
    const res = await csrfFetch('/api/session', {method: 'DELETE'});
    
    if (res?.ok) {
        
        dispatch(removeSession())
    } 
}


const sessionReducer = (state = {user: null}, action) => {

    const newState = Object.assign({},Object.freeze(state))

    switch (action.type) {
        case SETSESSION:
            newState.user = action.user
            return newState;

        case REMOVESESSION: 
            newState.user = null
            return newState;

        default:
            return state;
    }


}

export default sessionReducer