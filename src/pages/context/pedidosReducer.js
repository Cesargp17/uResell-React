import { types } from "./types/types";

export const pedidosReducer = (state, action) => {
    switch (action.type) {
        case types.newpedido:
            return [...state, action.payload]
    
        default:
            state;
    }
}