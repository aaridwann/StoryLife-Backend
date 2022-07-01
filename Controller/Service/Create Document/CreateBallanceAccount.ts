import { BalanceModels } from "../../../Models/BalanceModels";
import { balanceDb } from "../../../Models/BalanceModels";

export const CreateBallanceAccount = async (id: string, email: string) => {

    try {
        // Create Balance 
        new balanceDb<BalanceModels>({
            userId: id, email: email, balance: 0, state: false,
            bank: { name: '', accountNumber: '' },
            transaction: []
        })

            .save((err: any) => {
                if (err) {
                    return false
                }
                else {
                    return true
                }
            })

    } catch (error) {
        return false
    }
}