import { balanceDb, BalanceModels } from "../Models/BalanceModels";
import { Response } from "express";
import { User } from '../Controller/ProjectController'

interface Transfer {
    to: String,
    from: String
    amount: number,
    date: Date
    message: String
}
interface CreateBalance {
    userId: String,
    email: String,
    balance: number,
    state: boolean,
    bank: {
        name: String,
        accountNumber: String
    },
}

export const createBalance = async (req: { user: User, body: BalanceModels }, res: Response) => {
    if (!req.body||!req.user._id || !req.user.email || !req.body.bank.accountNumber || !req.body.bank.name) {
        return res.status(400).json({ message: 'data tidak lengakp', data: 'bank:name,accountNumber' })
    }
    let data: CreateBalance = {
        userId: req.user._id,
        email: req.user.email,
        balance: 0,
        state: false,
        bank: {
            name: req.body.bank.name,
            accountNumber: req.body.bank.accountNumber
        }
    }
  

    try {
        let save = new balanceDb<CreateBalance>({
            userId: data.userId,
            email: data.email,
            balance: data.balance,
            state: data.state,
            bank: {
                name: data.bank.name,
                accountNumber: data.bank.accountNumber
            }
        }).save((err: any) => {
            if (err) {
                return res.json({ data: err, message: 'Akun sudah terdaftar' })
            }
            return res.json('berhasil')
        })
    } catch (error) {
        res.json(error)
    }


}

export const transfer = async (req: { user: User, body: Transfer }, res: Response) => {
    let data: Transfer = {
        to: req.body.to,
        from: req.user._id,
        amount: req.body.amount,
        date: new Date(),
        message: req.body.message
    }
    if (!data.to || !data.from || !data.amount || !data.date || !data.message) {
        return res.json({ message: 'data tidak lengkap', data: 'to:,amount,message' })
    }
// masih bugs pada nilai transfer dan push transaksi

    // try {
    //     let update1 = await balanceDb.updateOne({ userId: req.user._id }, {
    //         $min: { balance: data.amount },
    //         $push: { transaction: { from: req.user._id, to: data.to, amount: data.amount, date: new Date(), message: data.message } }
    //     })
    //     let update2 = await balanceDb.updateOne({ userId: data.to }, {
    //         $inc: { balance: data.amount },
    //         $push: { transaction: { from: req.user._id, to: data.to, amount: data.amount, date: new Date(), message: data.message } }
    //     })
    //     return res.json({ message: 'berhasil transfer', data: { update1, update2 } })
    // } catch (error) {
    //     return res.json(error)
    // }

}

export default async function middlewareAccount(req: { user: User, body: { to: string, amount: number, message: string } }, res: Response, next: any) {
    let check = await balanceDb.findOne({ userId: req.user._id })
    if (!check) {
        return res.status(400).json('Anda belum memiliki Account Balance')
    }
    if (check.balance - req.body.amount <= 0) {
        return res.json({ message: 'Saldo anda tidak cukup' })
    }
    let checkTo = await balanceDb.findOne({ userId: req.body.to })
    if (!checkTo) {
        return res.status(400).json({ message: 'Account tujuan tidak terdaftar', data: checkTo })
    }
    next()
}