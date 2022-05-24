import { Response } from 'express'
import { vendor } from '../../../Models/VendorsModels'
import { VendorModelsInterface } from '../../../Models/VendorsModels'

interface Request {
    user: {
        token: string,
        _id: string
    },
    body: Omit<VendorModelsInterface, 'state'>
}


export const userToVendor = async (req: Request, res?: Response) => {


    // Check vendor Validation
    let checkVendor: { state: boolean, message: string } = await CheckVendor(req.user)
    if (checkVendor.state == false) {
        return { state: false, message: checkVendor.message }
    }
    // Init data
    let validationData: Request['body'] = req.body
    validationData.vendorId = req.user._id

    
    // Cek Data
    let cekData = await CheckData(validationData)
    if (cekData.state == false) {
        return { state: false, message: cekData }
    } else {
        return true
    }


}



// Function Check vendor
async function CheckVendor(req: Request['user']): Promise<{ state: boolean, message: string }> {
    if (!req._id || !req.token) {
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
async function CheckData(data: Request['body']) {
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
    } else if (!data.bankAccount[0].accountNumber || !data.bankAccount[0].bankName) {
        return message('bankAccount not found')
    } else if (!data.address.city || !data.address.street || !data.address.province || !data.address.state) {
        return message('address not found')
    }
    return { state: true }
}