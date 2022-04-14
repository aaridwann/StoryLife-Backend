import mongoose from "mongoose";
const categoryList = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']
interface Vendor {
    Photography: string,
    MakeupArtist: String,
    Videography: String
}
const project = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true, default: '' },
    categories: { type: String, required: true },
    vendor: {type:Object, default:null, unique:true},
    totalCost: { type: Number, required: true, default: 0 }

})

module.exports = mongoose.model('project', project)