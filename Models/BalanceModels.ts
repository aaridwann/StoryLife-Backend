import mongoose from "mongoose";

interface transaction {
    from: string
    to: string
    amount: number
    date: Date
    message: string
}
export interface BalanceModels {
    userId: string,
    email: string,
    userName:string,
    balance: number,
    state: boolean,
    bank: {
        name: string,
        accountNumber: string
    },
    transaction: Array<transaction | []>
}
const balance = new mongoose.Schema<BalanceModels>({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0, min: 0 },
    state: { type: Boolean, default: false },
    bank: {
        name: { type: String, default: '' },
        accountNumber: { type: String, default: '' }
    },
    transaction: [{
        from: { type: String, default: null },
        to: { type: String, default: null },
        amount: { type: Number, default: null },
        date: { type: Date, default: null },
        message: { type: String, default: null }
    } || []]

})
export const balanceDb = mongoose.model('balance', balance)