import { Response } from "express"
const userDb = require('../Models/UsersModels');
const projectDb = require('../Models/ProjectModels');


export const getallUsers = async (req: any, res: any) => {
    const response = await userDb.find({}, { name: 1, _id: 1, email: 1 })
    res.status(200).json({ data: response, message: 'Success Loaded' })
}


// Check email Register Real Time
export const getUserById = async (req: { query: { id: string, name: string, email: string } }, res: Response) => {
    let user = await userDb.findOne(req.query)
    if (user) {
        return res.json(false)
    }
    res.json(true)
}

// Controller for client Profile
export const ClientProfile = async (req: {user:{name:string}, query: { id: string } }, res: Response) => {
    let response = await userDb.aggregate([
        { '$addFields': { 'userId': { '$toString': '$_id' } } },
        {
            $lookup: {
                from: 'projects',
                localField: 'userId',
                foreignField: 'userId',
                as: 'Project'
            }
        },
        { '$match': { userId: req.query.id } },
        { '$project': { password: 0, refreshToken: 0, createdAt: 0, updatedAt: 0, _id: 0, __v: 0 } }
    ])
    res.json(response)
}