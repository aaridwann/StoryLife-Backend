const userDb = require('../Models/UsersModels')

interface User{
    _id:string
    name:string
    email:string
    iat:string
    exp:string
}

export default async function ClientMiddleware(req:{user:User},res:any,next:any) {
    let id:string = req.user._id
    const client = await userDb.findOne({_id:id,vendor:false})
    if(!client){
        return res.status(400).json('Anda adalah Vendor tidak bisa booking')
    }
    next()
}