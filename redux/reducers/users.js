import { ADDUSERS } from "../actions/actions";
import { addUsers } from "../actions/actions";

const initialState = []

export const usersReducer = (state = initialState, action)=>{
    //console.log("action.paylaod:", action.payload)
    if(action.type == ADDUSERS){
        return [...state, ...action.payload]
    }
    return state;
}



