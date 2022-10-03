import mongoose from "mongoose";

const Schema = mongoose.Schema
const stateType = ['suspense','unsuspense']

const suspense = new Schema({
    userId:{type:String,required:true,unique:true},
    status:{type:String, enum:stateType, default:'unsuspense'},
    alert:{type:Number, default:0, maxLengt:4}
})

const SuspenseModels = mongoose.model('suspense',suspense)
export default SuspenseModels