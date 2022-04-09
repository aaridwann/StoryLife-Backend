const userDb = require('../Models/UsersModels')
const TokenMiddleware = require('../MiddleWare/TokenMiddleware')

export const getallUsers = async (req: any, res: any) => {
    const response = await userDb.find({},{name:1,_id:1,email:1})
    res.status(200).json({ data: response, message: 'Success Loaded' })
}