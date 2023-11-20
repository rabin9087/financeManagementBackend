import express from 'express';
import { getUserTrans, insertTrans } from '../module/transcation/TransModule.js';
import { userAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

//insert transcation
router.post("/", userAuth, async (req, res) => {
    try {
        console.log(req.body);

        const result = await insertTrans({...req.body, userId: req.userId})

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

export default router;