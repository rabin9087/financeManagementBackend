import express from 'express';
import { getUserByEmail, insertUser } from '../module/user/UserModule.js';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'to be completed get',
        })
    } catch (error) {
        error.errorCode = 401;
        next(error)
    }
})

//creating user
router.post('/', async (req, res, next) => {
    try {
        const { password } = req.body;
        //has pass
        req.body.password = hashPassword(password);

        const result = await insertUser(req.body);
        result?._id ?
            res.json({
                status: 'success',
                message: 'Your account has been created, you may login now',
            }) :
            res.json({
                status: 'error',
                message: 'Unable to create an account now, Please contact admin for support',
            })

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "There is another user have this email already exist.";
            error.errorCode = 200;
        }
        next(error)
    }
})
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //has pass
        console.log(req.body)

        //check if user is exist for the given email
        const result = await getUserByEmail(email);

        //check if the pain password and the password from db, the hashed one , is the same
        if (result?.password) {
            const isMatched = comparePassword(password, result.password)

            if (isMatched) {
                result.password = undefined;

                return res.json({
                    status: 'success',
                    message: 'Logined is successfully',
                    user: result,
                })
            }
            res.json({
                status: 'error',
                message: 'Invalid Login details',
            })

        } else{
            res.json({
                status: 'error',
                message: 'Invalid Login details',
            })
        }

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "There is another user have this email already exist.";
            error.errorCode = 200;
        }
        next(error)
    }
});

router.put('/', (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'to be completed put',
        })
    } catch (error) {
        error.errorCode = 401;
        next(error)
    }
})

router.patch('/', (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'to be completed patch',
        })
    } catch (error) {
        error.errorCode = 401;
        next(error)
    }
});

router.delete('/', (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'to be completed delete',
        })
    } catch (error) {
        error.errorCode = 401;
        next(error)
    }
})

export default router;