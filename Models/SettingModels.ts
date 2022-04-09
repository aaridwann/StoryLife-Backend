import mongoose from "mongoose";

const setting = new mongoose.Schema({

        profilePicture:{type: String, default:''}

})

module.exports = mongoose.model('setting',setting);