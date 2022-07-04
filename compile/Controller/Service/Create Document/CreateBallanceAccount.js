"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBallanceAccount = void 0;
const BalanceModels_1 = require("../../../Models/BalanceModels");
const CreateBallanceAccount = async (id, email, name) => {
    try {
        // Create Balance 
        let create = new BalanceModels_1.balanceDb({
            userId: id, userName: name, email: email, balance: 0, state: false,
            bank: { name: '', accountNumber: '' },
            transaction: []
        });
        let exec = await create.save();
        if (!exec) {
            console.log(exec);
            return false;
        }
        else {
            console.log(exec);
            return true;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.CreateBallanceAccount = CreateBallanceAccount;
