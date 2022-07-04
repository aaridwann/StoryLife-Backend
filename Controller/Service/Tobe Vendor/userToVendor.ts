import { Response } from 'express'
import { vendor } from '../../../Models/VendorsModels'
import { VendorModelsInterface } from '../../../Models/VendorsModels'
import { userDb } from '../../../Models/UsersModels'

interface Request {
    user: {
        token: string,
        _id: string
    },
    body: Omit<VendorModelsInterface, 'state'>
}


export const userToVendor = async (req: Request, res: Response) => {

    // Step 1
    // Check vendor Validation
    let checkVendor: { state: boolean, message: string } = await CheckVendor(req.user)
    if (checkVendor.state === false) {
        return res.status(400).json({ state: false, message: checkVendor.message })
    }

    // Step 2
    // Init data
    let validationData: Request['body'] = req.body
    validationData.vendorId = req.user._id

    // Step 3
    // Cek Data
    let cekData = await CheckData(validationData)
    if (cekData.state == false) {
        return res.status(400).json({ state: false, message: cekData.message })
    }

    // Step 4
    // Check user as vendor or not
    let checkUserAsVendor = await CheckUserVendor(req.user._id)
    if (checkUserAsVendor.state == false) {
        return res.status(400).json({ state: false, message: checkUserAsVendor.message })
    }

    // Step 5
    // Check name vendor
    if ((await CheckNameVendor(req.body.vendorName)).state == false) {
        return res.status(400).json({ state: false, message: 'vendor name already used' })
    }

    // Step 6
    // Insert to db
    try {
        let insertDbVendor = new vendor(validationData)
        await insertDbVendor.save()
    } catch (error) {
        return res.status(400).json({ state: false, message: error })
    }

    // Step 7
    // Change State vendor on user tobe true
    let ChangeStateVendor = await UserVendorState(req.user._id)
    if (!ChangeStateVendor.state) {
        return res.status(400).json({ state: false, message: ChangeStateVendor.message })
    }
    return res.status(201).json({ state: true, message: 'success create vendor' })

}

//   Child Function


// Function Check vendor
async function CheckVendor(req: { _id: string, token: string }): Promise<{ state: boolean, message: any }> {
    // console.log(req._id)
    if (!req._id) {
        return { state: false, message: 'id headers or token not found' }
    }
    try {
        let res = await vendor.findOne({ vendorId: req._id })
        if (res) {
            return { state: false, message: 'vendor already' }
        }
    } catch (error) {
        return { state: false, message: error }
    }
    return { state: true, message: '' }

}

// Function check data from body
async function CheckData(data: Request['body']): Promise<{ state: boolean, message?: string }> {
    let message = (x: any) => {
        return { state: false, message: x }
    }
    if (!data.vendorName) {
        return message('vendor name not found')
    } else if (!data.vendorId) {
        return message('vendor id not found')
    } else if (!data.vendorCategory) {
        return message('vendor category not found')
    } else if (!data.identity) {
        return message('identity not found')
    } else if (!data.contact) {
        return message('contact not found')
    } else if (!data.bankAccount[0] || !data.bankAccount[0].bankName || !data.bankAccount[0].accountNumber) {
        return message('bankAccount not found')
    } else if (!data.address.city || !data.address.street || !data.address.province || !data.address.state) {
        return message('address not found')
    }
    return { state: true }
}

// Function Replace state vendor on userDb
async function UserVendorState(id: string): Promise<{ state: boolean, message?: any }> {
    try {
        let res = await userDb.updateOne({ _id: id }, { $set: { vendor: true } })
        return { state: true }
    } catch (error) {
        return { state: false, message: error }

    }
}

// function Check user is vendor or not

async function CheckUserVendor(id: string): Promise<{ state: boolean, message?: any }> {

    try {
        let res = await userDb.findOne({ _id: id }, { vendor: 1 })
        if (!res) {
            return { state: false, message: 'account null' }
        }
        if (res.vendor == true) {
            return { state: false, message: 'you already vendor' }
        } else {
            return { state: true }
        }
    } catch (error) {

        return { state: false, message: error }
    }
}

// Function Check name vendor

async function CheckNameVendor(name: string): Promise<{ state: boolean, message?: string }> {
    if (!name) {
        return { state: false, message: 'name vendor not found' }
    }

    let res = await vendor.findOne({ vendorName: { $regex: name, $options: 'ig' } })
    if (res !== null) {
        return { state: false, message: 'vendor name already used' }
    }
    return { state: true }

}