import TransSchema from "./TransSchema.js";

//create transaction
export const insertTrans = (transObj) => {
    return TransSchema(transObj).save();
}

//read transaction by user _id
export const getUserTrans = (userId) => {
    return TransSchema.find({userId});
}

//Delete transaction

//Update transaction  -homework