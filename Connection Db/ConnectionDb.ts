require('dotenv').config()
import mongoose from "mongoose"
const url = process.env.DB_URL
export const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://aaridwann:Magnumblue234@cluster0.jubwp.mongodb.net/Storylife?retryWrites=true&w=majority')
        const db = mongoose.connection
         console.log('Connect Database')
    } catch (error) {
        
    }
}
