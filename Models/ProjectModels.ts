import mongoose from "mongoose";
export const categoryProject = ['wedding', 'party', 'prewedding', 'birthday', 'engagement', 'religion']
interface Vendor {
    Photography: string,
    MakeupArtist: String,
    Videography: String
}
const project = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: Object, required: true, default: '' },
    category: { type: String,enum:categoryProject, required: true },
    vendor: {type:Array, default:null},
    totalCost: { type: Number, required: true, default: 0 }

})

module.exports = mongoose.model('project', project)