import { BalanceModels } from "../../Models/BalanceModels";
import { balanceDb } from "../../Models/BalanceModels";

export const CreateBallanceAccount = async (email: string, userDb: any) => {

    // FindUser id
    let find = await userDb.findOne({ email: email }, { _id: 1, email: 1 })

    if (find == null) {
        return 'users not found'
    }

    // initial id and email from find user
    let user = { id: find._id.toString(), email: find.email }

    // Create Balance 
    new balanceDb<BalanceModels>({
        userId: user.id, email: user.email, balance: 0, state: false,
        bank: { name: '', accountNumber: '' },
        transaction: []
    })

        .save((err: any) => {
            if (err) {
                return 'users has have account'
            }
            else {
                return 'ballance account success created'
            }
        })
}