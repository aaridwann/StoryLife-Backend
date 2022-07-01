import { userDb } from "../../Models/UsersModels";
const { CreateBallanceAccount } = require("../Create Document/CreateBallanceAccount");
const { CreateEventDocument } = require("../Create Document/CreateEventDocument");
const { CreateFollowDb } = require("../Create Document/CreateFollowDb");
const bcrypt = require('bcrypt');

interface RequestRegisterInterface {
    body: {
        email: string
        name: string
        password: string
    }
}
interface Validator {
    state: boolean,
    message: string
}


// export const RegisterService = async (req: RequestRegisterInterface, res: any) => {
//     // Validator
//     let validator: Validator | undefined = await validationRequest(req.body)
//     if (validator?.state == false) {
//         return validator
//     }
//     // Hasing password
//     let password = await hashingPassword(req.body.password)
//     req.body.password = password
//     req.body.name = req.body.name.trim().toLowerCase()
//     // input userDb
//     try {
//         new userDb(req.body).save(async (err: any) => {
//             if (err) {
//                 return res.staus(300).json(err)
//             }
//             else {
//                 let createAdditionalDb = await CreateAdditionalDb(req.body.email)
//                 if (createAdditionalDb === false) {
//                     // return { state: false, message: createAdditionalDb.data }
//                     return res.json({ state: false, message: createAdditionalDb.data })
//                 }
//                 return res.json(true)
//             }
//         })

//     } catch (error) {
//         return res.json(error)
//     }

// }

const validationRequest = async (req: RequestRegisterInterface['body']): Promise<Validator | undefined> => {
    let { email, password, name } = req
    // init data
    if (!email || !password || !name) {
        return { state: false, message: 'check input data' }
    }
    // check length password
    if (password.toString().length < 5) {
        return { state: false, message: 'password minimum 5 character' }
    }
    // check already email
    let res = await userDb.findOne({ email: email })
    if (res !== null) {
        return { state: false, message: 'email already used' }
    }
    return

}

const hashingPassword = async (password: string): Promise<string> => {
    let salt = 15
    let hashingPassword = await bcrypt.hash(password.toString(), salt)
    return hashingPassword
}

const CreateAdditionalDb = async (email: string): Promise<boolean | any> => {
    let id = await userDb.findOne({ email: email })
    id = id._id.toString()
    let event = await CreateEventDocument(id, email)
    let ballance: any = await CreateBallanceAccount(id, email)
    let follow = await CreateFollowDb(id)
    if (ballance == false || follow == false || event == false) {
        return false
    }
    return

}