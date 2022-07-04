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
        // Save await
        let exec = await create.save()
        // Condition if save is failed
        if (!exec) {
            return false
        } else {
            return true
        }

    } catch (error) {
        console.log(error)
        return false
    }
}