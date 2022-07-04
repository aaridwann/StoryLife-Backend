import { Response } from "express";
import { balanceDb } from "../../../Models/BalanceModels";

interface Request {
    user: {
        _id: string
    },
    params: {
        id: string,
        amount: number
    }
}

/*
1. check ballance user
2. jika kurang dari amount return saldo kurang
3. tarik dana user sesuai amount
4. jika gagal kembalikan lagi
5. tambah dana ke target
6. jika gagal kembalikan lagi
*/



export const Transfer = async (req: Request, res: Response) => {

}

// 1. Check ballance
export const CheckBallance = async (id: string): Promise<{ state: boolean, message: string } | any> => {
    try {
        let check = await balanceDb.findOne({ userId: id }, { _id: 0 })
        if (!check) {
            return { state: false, message: 'account not found' }
        }
        return { state: true, message: check }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}