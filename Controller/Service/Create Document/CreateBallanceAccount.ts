import { BalanceModels } from "../../../Models/BalanceModels";
import { balanceDb } from "../../../Models/BalanceModels";

export const CreateBallanceAccount = async (id: string, email: string, name: string) => {
    try {
        // Create Balance 
        let create = new balanceDb<BalanceModels>({
            userId: id, userName: name, email: email, balance: 0, state: false,
            bank: { name: '', accountNumber: '' },
            transaction: []
        })
        let exec = await create.save()
        if (!exec) {
            return false
        } else {
            return true
        }

    } catch (error) {
        return false
    }
}