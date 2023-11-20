import 'dotenv/config'
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

import cors from 'cors';
//middleware
app.use(express.json());
app.use(cors());

//Db connection
import { connectMongoDb } from './src/config/dbConfig.js';
connectMongoDb();

//routers
import userRouter from './src/routers/userRouter.js'
import transRouter from './src/routers/transRouter.js'
import { userAuth } from './src/middleware/authMiddleware.js';

app.use('/api/v1/user', userRouter)
app.use('/api/v1/transaction' ,userAuth, transRouter)

app.use('/', (req, res) => {
    res.json({
        message: 'Server is live',
    })
})

// app.get('/', (req, res, next ) => {

//     const obj = {
//         message: '404 Page not found',
//         errorCode: 404,
//     }
//     next(obj)
// });



//error handling at one place
app.use((error, req, res, next)=> {

    const errorCode =error.errorCode || 500;

    res.status(errorCode).json({
        status: 'error',
        message: error.message,
    })
})

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Your server is running at http://localhost:${PORT}`)
})