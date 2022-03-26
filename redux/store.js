import { createStore } from "redux";
import { addUsers } from "./actions/actions";
import  Reducer  from "./reducers";


const store = createStore(Reducer);
// store.dispatch(addUsers([{id : 1}, {id : 2}]))
// console.log("Store in store file", store.getState())
// console.log("Reducer is", Reducer)

export default store;
