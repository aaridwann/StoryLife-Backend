const vendorDb = require('../Models/VendorsModels')
const categoryList = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']

export const addVendor = async (req: any, res: any) => {
    const userId = req.user._id
    const { identity: { typeIdentity, numberIdentity }, categoryVendor, address, phone1, phone2,
        bankAccount: { bankName, accountNumber } } = req.body
    if (!typeIdentity || !numberIdentity || !categoryVendor || !address || !phone1 || !phone2 || !bankName || !accountNumber) {
        return res.status(400).json({ message: 'data tidak lengkap' })
    }
    if (!categoryList.includes(categoryVendor)) {
        return res.status(404).json({ message: 'Category tidak tersedia' })
    }

    await new vendorDb({
        userId: userId,
        identity: { typeIdentity: typeIdentity, numberIdentity: numberIdentity },
        categoryVendor: categoryVendor,
        address: address,
        phone1: phone1,
        phone2: phone2,
        bankAccount: { bankName: bankName, accountNumber: accountNumber },
        status: false,
        balance: 0
    }).save((err: string) => {
        if (err) {
            return res.status(400).json({data:err,message:'Akun sudah terdaftar'})
        }
        return res.status(201).json({ message: 'Success' })
    })
}