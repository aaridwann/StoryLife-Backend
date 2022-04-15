const packageDb = require('../Models/PackageModels')
const vendorDb = require('../Models/VendorsModels')
const CategoryPackage = require('../Models/PackageModels')
import { Request } from 'express'

interface DetailsPackage {
    packageName: String
    category: typeof CategoryPackage
    price: number,
    details: String,
    discount: number,
}
interface Vendor {
    _id: String
    name: String
    email: String
    iat: String
    exp: String
}
interface PackageList {
    vendor: Vendor
    package: DetailsPackage
    addPackage?: (res: any) => void

}
interface Req extends Request {
    body: DetailsPackage
    vendor: Vendor
}

class Package implements PackageList {
    vendor: Vendor = {
        _id: '',
        name: '',
        email: '',
        iat: '',
        exp: '',
    }
    package: DetailsPackage = {
        packageName: '',
        category: typeof CategoryPackage,
        price: 0,
        details: '',
        discount: 0
    }

    constructor(req: Req, res: any) {
        if (!req.body) {
            return res.json({ message: 'Paket Tidak ada' })
        }
        this.vendor = req.vendor
        this.package = req.body
        this.package.price -= this.package.discount
    }
  
    // Method Add

    async addPackage(res: any) {
        let check1 = await packageDb.findOne({ vendorId: this.vendor._id })
        if (check1 == null) {
            let created = await new packageDb({
                vendorId: this.vendor._id,
                vendorName: this.vendor.name,
                package: this.package
            }).save((err: { message: string }) => {
                if(err){
                    return res.json(err.message)
                }
                return res.json({ data: created, message: 'Data berhasil dibuat' })
            })
        } else {
            // Bug Enum pada Package
            let add = await packageDb.updateOne({ vendorId: this.vendor._id }, { $push: { package: this.package } })
            .catch((err:any) => {
                return res.json(err)
            })
            return res.json(add)
        }
    }


}

module.exports = Package

function res(res: any) {
    throw new Error('Function not implemented.')
}
