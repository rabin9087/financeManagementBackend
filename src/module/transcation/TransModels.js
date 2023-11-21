import TransSchema from "./TransSchema.js";

//create transaction
export const insertTrans = (transObj) => {
    return TransSchema(transObj).save();
}

//read transaction by user _id
export const getUserTrans = (userId) => {
    return TransSchema.find({ userId });
}

//Delete transaction

export const deleteManyIds = (userId, idsArg) => {
    return TransSchema.deleteMany({ userId, _id: { $in: idsArg, } })
}

//Update transaction  -homework