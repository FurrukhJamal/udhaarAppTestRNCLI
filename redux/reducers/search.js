import { SEARCHEDUSERS } from "../actions/actions"


const initialState = []
export const searchedUsersReducer = (state = initialState, action)=>{
    if(action.type == SEARCHEDUSERS){
        return [...action.payload]
    }
    return state

}

