import mongoose from "mongoose";
const categoryList = ['photography','videography','makeup artist','gawn','decoration','invitation','venue','mc','entertainment','wedding service']
const project = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true, default: '' },
    categories: { type: String, required: true },
    vendor: [
        {
            userId: { type: String, required: true },
            name: { type: String, required: true },
            categories: { type:String, enum:categoryList},
            package: { type: Object, required: true },
            total: { type: Number, required: true }
        }
    ],
    totalCost: { type: Number, required: true, default: 0 }

})

module.exports = mongoose.model('project', project)