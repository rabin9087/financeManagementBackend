import UserSchema from "./UserSchema.js";

//insert new User
export const insertUser = userObj => {
    return UserSchema(userObj).save();
}

//get user by their @email
export const getUserByEmail = email => {
    return UserSchema.findOne({email});
}

//get user by their @_id
export const getUserById = _id => {
    return UserSchema.findById(_id);
}

//Update user

//Delete user