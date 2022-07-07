import { Response } from 'express'
import { vendor } from '../../../../Models/VendorsModels'
import { VendorModelsInterface } from '../../../../Models/VendorsModels'
import { userDb } from '../../../../Models/UsersModels'
import { ObjectId } from 'mongodb'
import { CreateAdditionalDocument } from './Create Additional Document/CreateAdditionalDocument'
import { AbortAdditionalDocument } from './Create Additional Document/AbortDocumentVendor'


// 1. check body
// 2. check status vendor di user
// 3. insert ke vendor

interface Body {
    // vendorId: string
    vendorName: string
    identity: { typeIdentity: string, numberIdentity: number },
    vendorCategory: string,
    address: { street: string, city: string, province: string, state: string },
    contact: { phone1: string, phone2: string },
    bankAccount: { bankName: string, accountNumber: number },
    balance: number
}

interface Request {
    user: {
        _id: string
    },
    body: Body
}


export const userToVendor = async (req: Request, res: Response) => {
    const body: any = req.body
    body.vendorId = req.user._id
    // 1. check user status
    const userCheck = await checkUser(req.user._id)
    if (!userCheck.state) {
        return res.json(userCheck) 
    }

    // 2. insert into Vendor
    const createVendor = await insertVendor(body)
    if (!createVendor.state) {
        return res.json(createVendor)
    }

    // 3. create additional vendor document
    const createAdditional = await CreateAdditionalDocument(req.user._id, req.body.vendorName)
    if (createAdditional.state == false) {
        await AbortAdditionalDocument(req.user._id)
        return res.status(400).json(createAdditional)
    }

    return res.status(201).json({ state: true, message: 'success created vendor' })

}

// 1. checkStatus user
const checkUser = async (userId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const check = await userDb.findOne({ _id: new ObjectId(userId) })
        if (!check || check.vendor == true) {
            return { state: false, message: 'you has been vendor' }
        }
        return { state: true, message: 'ok' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

// 2. Insert Vendor 
const insertVendor = async (data: VendorModelsInterface): Promise<{ state: boolean, message: string }> => {
    try {
        let insert = new vendor<VendorModelsInterface>(data)
        const save = await insert.save()
        if (!save) {
            return { state: false, message: 'insert failed' }
        }

        return { state: true, message: 'ok' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}