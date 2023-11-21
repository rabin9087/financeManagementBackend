import express from 'express';
import { deleteManyIds, getUserTrans, insertTrans } from '../module/transcation/TransModels.js';
import { userAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

//insert transcation
router.post("/", userAuth, async (req, res) => {
    try {
        console.log(req.body);

        const result = await insertTrans({ ...req.body, userId: req.userId })

        result?._id ?
            res.json({
                status: 'success',
                message: "Transaction has been added successfully"
            }) :
            res.json({
                status: 'error',
                message: "Unable to add the transaction, pllease try again later"
            })
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})

//get all transcation for specific user only
router.get("/", userAuth, async (req, res) => {
    try {
        console.log(req.body);


        const transList = await getUserTrans(req.userId)
        res.json({
            status: 'success',
            message: "Here are the transaction List",
            transList,
        })
    } catch (error) {
        next(error)
    }
})

//delete transcation
router.delete("/", userAuth, async (req, res) => {

    try {
        const { userId, body } = req
        const result = await deleteManyIds(userId, body)

        result?.deletedCount ?
            res.json({
                status: 'success',
                message: `${result.deletedCount} transaction has been deleted`
            }) :
            res.json({
                status: 'error',
                message: "Unable to delete data, please try again"
            })

    } catch (error) {
        console.log(error)
    }

})

export default router;