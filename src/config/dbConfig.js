import mongoose from "mongoose";

export const connectMongoDb = async () => {
    try {
        if (!process.env.MONGO_URL) {
            return console.log("No MongoDb connection Url is found, please add MONGO_URL in your env Variable")
        }
        const conn = await mongoose.connect(process.env.MONGO_URL)
        conn && console.log("MongoDb connected")
    } catch (error) {
        console.log(error)
    }
}
// export default connectMongoDb;