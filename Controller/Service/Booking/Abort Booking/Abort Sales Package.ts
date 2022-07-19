import { ObjectId } from 'mongodb'
import { packagedb } from '../../../../Models/PackageModels'


export const AbortSales = async (packageId: ObjectId, quantity: number): Promise<{ state: boolean, message: string }> => {
    try {
        const abort = await packagedb.findOneAndUpdate({ package: { $elemMatch: { _id: packageId } } }, { $inc: { 'package.$.sales': -quantity } }, { new: true })
        if (!abort) return { state: false, message: 'package is not found' }
        return { state: true, message: 'success abort sales' }
    } catch (error: any) {
        return { state: false, message: error }
    }
}