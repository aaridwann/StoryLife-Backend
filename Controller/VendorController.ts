const vendorDb = require('../Models/VendorsModels')
const userDb = require('../Models/UsersModels')
const categoryList = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']

export const addVendor = async (req: any, res: any) => {
    const userId = req.user._id
    const {nameVendor, identity: { typeIdentity, numberIdentity }, categoryVendor, address: { street, city, province, state }, phone1, phone2,
        bankAccount: { bankName, accountNumber } } = req.body
    if (!typeIdentity || !numberIdentity || !categoryVendor || !street || !city || !state || !province || !phone1 || !phone2 || !bankName || !accountNumber) {
        return res.status(400).json({ message: 'data tidak lengkap' })
    }
    if (!categoryList.includes(categoryVendor)) {
        return res.status(404).json({ message: 'Category tidak tersedia' })
    }

    // Cek name Vendor
    let check  = await vendorDb.findOne({nameVendor:nameVendor},{nameVendor:1,categoryVendor:1,address:1})
    if(check) {
        return  res.json({data:check,message:'vendor sudah terdaftar'})
    }

    // Add Vendor
    await new vendorDb({
        userId: userId,
        nameVendor:nameVendor,
        identity: { typeIdentity: typeIdentity, numberIdentity: numberIdentity },
        categoryVendor: categoryVendor,
        address: { street: street, city: city, province: province, state: state },
        phone1: phone1,
        phone2: phone2,
        bankAccount: { bankName: bankName, accountNumber: accountNumber },
        status: false,
        balance: 0
    }).save(async (err: string) => {
        if (err) {
            return res.status(400).json({ data: err, message: 'Akun sudah terdaftar' })
        }
        // Edit user to Cheklist Vendor
       let response = await userDb.updateOne({_id:userId},{$set:{vendor:true}})
        return res.status(201).json({ message: 'Success',dataUser: response})
    })

}