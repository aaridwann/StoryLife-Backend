import mongoose from "mongoose";

const project = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    vendor: [
        { userId: { type: String, required: true }, name: { type: String, required: true }, categories: { type: String, required: true } }
    ]
})

module.exports = mongoose.model('project', project)