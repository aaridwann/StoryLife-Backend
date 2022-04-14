require('dotenv').config()
import mongoose from "mongoose"
const url = process.env.DB_URL
export const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/StoryLife')
        // const db = mongoose.connection
         console.log('Connect Database')
    } catch (error) {
        
    }
}
