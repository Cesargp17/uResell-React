import { types } from "./types";

export const cartReducer = (state = [], action) => {
    switch (action.type) {
        case types.addtocart:
            return [...state, action.payload]

        case types.deletecart:
            return state.filter(p=>p.id !== action.payload);

        case types.addQuantity:
            return state.map(product=>{
                if(product.id === action.payload){
                    return {
                        ...product,
                        Cantidad: product.Cantidad += 1
                    }
                }
                return product;
            });

        case types.restQuantity:
            return state.map(product=>{
                if(product.id === action.payload){
                    return {
                        ...product, 
                        Cantidad: product.Cantidad -=1
                    }
                }
                return product;
            })
    
        default:
            return state;
    }
}