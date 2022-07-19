import mongoose from "mongoose";

export interface transaction {
    state: string
    from: string
    to: string
    amount: number
    date: number
    message: string
}
export interface BalanceModels {
    userId: string,
    email: string,
    userName: string,
    balance: number,
    state: boolean,
    bank: {
        name: string,
        accountNumber: string
    },
    transaction: Array<transaction>
}

const balance = new mongoose.Schema<BalanceModels>({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, min: 0 },
    state: { type: Boolean, default: false },
    bank: {
        name: { type: String, default: '' },
        accountNumber: { type: String, default: '' }
    },
    transaction: [{
            state: { type: String, enum: ['cash in', 'cash out'] },
            from: { type: String },
            to: { type: String },
            amount: { type: Number },
            date: { type: Number },
            message: { type: String },
        }],

})
export const balanceDb = mongoose.model('balance', balance)