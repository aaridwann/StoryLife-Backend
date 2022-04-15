const userDb = require('../Models/UsersModels')
const vendorDb = require('../Models/VendorsModels')

export const verifyVendor = async (req:any,res:any,next:any) =>{
    // Chek user is Vendor Or not
    const user = await userDb.findOne({_id:req.user._id,vendor:true})
    if(!user){
        return res.json({data:user,message:'Anda bukan Vendor'})
    }
    // Chek user is have vendor or not Yet
    const vendor = await vendorDb.findOne({vendorId:user._id})
    if(!vendor){
        return res.json({data:vendor,message:'Vendor kamu belum ada'})
    }
    req.vendor = vendor
    next()
}