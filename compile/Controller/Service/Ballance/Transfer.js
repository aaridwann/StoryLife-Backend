"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordTransaction = exports.TransferBallance = exports.CheckBallance = exports.Transfer = void 0;
const BalanceModels_1 = require("../../../Models/BalanceModels");
/*
1. check ballance user
2. jika kurang dari amount return saldo kurang
3. tarik dana user sesuai amount
4. jika gagal kembalikan lagi
5. tambah dana ke target
6. jika gagal kembalikan lagi
7. Tambah Transaction record
*/
const Transfer = async (req, res) => {
    // 1. cek saldo dan ambil saldo dari user
    let getSaldo = await (0, exports.CheckBallance)(req.user._id, req.params.id, req.params.amount);
    if (!getSaldo.state) {
        // return res.status(400).json(getSaldo.message)
        return getSaldo;
    }
    // 2. transfer to target
    const transfer = await (0, exports.TransferBallance)(getSaldo.message.target.userId, getSaldo.message.target.balance, req.params.amount);
    if (!transfer.state) {
        // transfer back to user
        await (0, exports.TransferBallance)(getSaldo.message.user.userId, getSaldo.message.user.balance, req.params.amount);
        return transfer;
    }
    // 3. write Record transaction
    const recordTransaction = await (0, exports.RecordTransaction)(getSaldo.message.user.userId, getSaldo.message.target.userId, req.params.amount, req.params.message);
    return recordTransaction;
};
exports.Transfer = Transfer;
const CheckBallance = async (id, idTarget, amount) => {
    // 1. Check minimum transfer
    if (amount < 10000) {
        return { state: false, message: 'minimal transfer 10.000' };
    }
    try {
        // 2. Find user & Target balance
        let check = await BalanceModels_1.balanceDb.find({ userId: { $in: [id, idTarget] } }, { balance: 1, userId: 1, _id: 0 });
        if (check.length !== 2) {
            return { state: false, message: 'account not found' };
        }
        // 3. init user and target
        let user;
        let target;
        check.map((x) => {
            if (x.userId == id) {
                user = Object.create(x);
            }
            else {
                target = Object.create(x);
            }
        });
        // Condition if user or target is undefined
        if (!user || !target) {
            return { state: false, message: 'user or target not found' };
        }
        // Validation balance is not enough
        user.balance -= amount;
        if (user.balance <= 0) {
            return { state: false, message: 'balance is not enough' };
        }
        // 3. update current ballance user
        let update = await BalanceModels_1.balanceDb.findOneAndUpdate({ userId: user.userId }, { $set: { balance: user.balance } }, { new: true });
        if (!update) {
            return { state: false, message: 'update decreament balance user is fail' };
        }
        return { state: true, message: { user: { userId: update.userId, balance: update.balance }, target: { userId: target.userId, balance: target.balance } } };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.CheckBallance = CheckBallance;
// 2. Transfer
const TransferBallance = async (idTarget, balanceTarget, amount) => {
    const currentBalance = balanceTarget + amount;
    try {
        let tf = await BalanceModels_1.balanceDb.findOneAndUpdate({ userId: idTarget }, { $set: { balance: currentBalance } }, { new: true });
        if (!tf) {
            return { state: false, message: 'transfer failed' };
        }
        return { state: true, message: 'transfer success' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.TransferBallance = TransferBallance;
// 3. Transaxtion record
const RecordTransaction = async (idUser, idTarget, amount, message = 'Thank you') => {
    if (!idUser || !idTarget || !amount) {
        return { state: false, message: 'idUser idTarget, amount not found' };
    }
    try {
        const bulk = await BalanceModels_1.balanceDb.bulkWrite([
            {
                updateOne: {
                    "filter": { userId: idUser },
                    "update": {
                        "$push": {
                            transaction: { state: 'cash out', from: idUser, to: idTarget, amount: amount, date: Date.now(), message: message }
                        }
                    }
                }
            },
            {
                updateOne: {
                    filter: { userId: idTarget },
                    update: {
                        $push: {
                            transaction: { state: 'cash in', from: idUser, to: idTarget, amount: amount, date: Date.now(), message: message }
                        }
                    }
                }
            }
        ]);
        if (!bulk) {
            return { state: false, message: 'create record failed' };
        }
        return { state: true, message: 'transfer success' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.RecordTransaction = RecordTransaction;
