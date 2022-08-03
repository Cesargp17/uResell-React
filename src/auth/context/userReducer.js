

export const userReducer = (initialState = [], action) => {
    
    switch (action.type) {
        case 'CheckCredentials':
            return action.payload

        case 'Login':
            return action.payload
    
        case 'Logout':
            return action.payload
            
        default:
            initialState;
    }
}