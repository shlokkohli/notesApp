export interface User {
    _id : string,
    name : string,
    email : string,
}

export interface signUpResponse {
    message : string,
    user : User,
}