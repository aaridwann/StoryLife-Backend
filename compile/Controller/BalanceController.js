"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.createBalance = void 0;
const BalanceModels_1 = require("../Models/BalanceModels");
const createBalance = async (req, res) => {
    if (!req.body || !req.user._id || !req.user.email || !req.body.bank.accountNumber || !req.body.bank.name) {
        return res.status(400).json({ message: 'data tidak lengakp', data: 'bank:name,accountNumber' });
    }
    let data = {
        userId: req.user._id,
        email: req.user.email,
        balance: 0,
        state: false,
        bank: {
            name: req.body.bank.name,
            accountNumber: req.body.bank.accountNumber
        }
    };
    try {
        let save = new BalanceModels_1.balanceDb({
            userId: data.userId,
            email: data.email,
            balance: data.balance,
            state: data.state,
            bank: {
                name: data.bank.name,
                accountNumber: data.bank.accountNumber
            }
        }).save((err) => {
            if (err) {
                return res.json({ data: err, message: 'Akun sudah terdaftar' });
            }
            return res.json('berhasil');
        });
    }
    catch (error) {
        res.json(error);
    }
};
exports.createBalance = createBalance;
const transfer = async (req, res) => {
    let data = {
        to: req.body.to,
        from: req.user._id,
        amount: req.body.amount,
        date: new Date(),
        message: req.body.message
    };
    if (!data.to || !data.from || !data.amount || !data.date || !data.message) {
        return res.json({ message: 'data tidak lengkap', data: 'to:,amount,message' });
    }
    // masih bugs pada nilai transfer dan push transaksi
    try {
        let update1 = await BalanceModels_1.balanceDb.updateOne({ userId: req.user._id }, {
            $min: { balance: data.amount },
            $push: { transaction: { from: req.user._id, to: data.to, amount: data.amount, date: new Date(), message: data.message } }
        });
        let update2 = await BalanceModels_1.balanceDb.updateOne({ userId: data.to }, {
            $inc: { balance: data.amount },
            $push: { transaction: { from: req.user._id, to: data.to, amount: data.amount, date: new Date(), message: data.message } }
        });
        return res.json({ message: 'berhasil transfer', data: { update1, update2 } });
    }
    catch (error) {
        return res.json(error);
    }
};
exports.transfer = transfer;
async function middlewareAccount(req, res, next) {
    let check = await BalanceModels_1.balanceDb.findOne({ userId: req.user._id });
    if (!check) {
        return res.status(400).json('Anda belum memiliki Account Balance');
    }
    if (check.balance - req.body.amount <= 0) {
        return res.json({ message: 'Saldo anda tidak cukup' });
    }
    let checkTo = await BalanceModels_1.balanceDb.findOne({ userId: req.body.to });
    if (!checkTo) {
        return res.status(400).json({ message: 'Account tujuan tidak terdaftar', data: checkTo });
    }
    next();
}
exports.default = middlewareAccount;
