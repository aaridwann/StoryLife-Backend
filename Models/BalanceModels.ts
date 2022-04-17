import mongoose from "mongoose";

export interface BalanceModels {
    userId: String,
    email: String,
    balance: number,
    state:boolean,
    bank:{
        name:String,
        accountNumber:String
    },
    transaction: [
        {
            from: String
            to: String
            amount: number
            date: Date
            message: String
        }
    ]
}
const balance = new mongoose.Schema<BalanceModels>({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 , min:0 },
    state:{type:Boolean, default:false},
    bank:{
        name:{type:String,required:true},
        accountNumber:{type:String,required:true,unique:true}
    },
    transaction: {
        transfer: {
            from: { type: String},
            to: { type: String},
            amount: { type: Number},
            date: { type: Date},
            message: { type: String},
        }
    }
})
export const balanceDb = mongoose.model('balance',balance)