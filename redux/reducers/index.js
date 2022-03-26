import { combineReducers } from "redux";
import { searchedUsers, searchedUsersReducer } from "./search";
import {usersReducer} from "./users";

const Reducer = combineReducers({
    users : usersReducer,
    searchedUsers : searchedUsersReducer,
})

export default Reducer;