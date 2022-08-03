import { types } from "./types/types";

export const pedidoReducer = (state, action) => {
    switch (action.type) {
        case types.pedidos:
            return [action.payload]
    
        case types.checking:
            return action.payload

        case types.load:
            return action.payload

        default:
            state;
    }
}