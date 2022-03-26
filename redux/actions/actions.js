export const ADDUSERS = "ADD USERS";
export const SEARCHEDUSERS = "SEARCHEDUSERS"

export const addUsers = (users)=>({
    type : ADDUSERS,
    payload : users,
})

export const addSearchedUsers = (users)=>({
    type : SEARCHEDUSERS,
    payload : users
})