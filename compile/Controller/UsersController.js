"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProfile = exports.getUserById = exports.getallUsers = void 0;
const { userDb } = require('../Models/UsersModels');
const { eventDb } = require('../Models/EventModels');
const getallUsers = async (req, res) => {
    const response = await userDb.find({}, { name: 1, _id: 1, email: 1 });
    res.status(200).json({ data: response, message: 'Success Loaded' });
};
exports.getallUsers = getallUsers;
// Check email Register Real Time
const getUserById = async (req, res) => {
    let user = await userDb.findOne(req.query);
    if (user) {
        return res.json(false);
    }
    res.json(true);
};
exports.getUserById = getUserById;
// Controller for client Profile
const ClientProfile = async (req, res) => {
    try {
        let response = await userDb.aggregate([
            // Add Fields
            { '$addFields': { 'userId': { '$toString': '$_id' } } },
            // Lokkup to project db
            {
                $lookup: {
                    from: 'events',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'Project'
                }
            },
            // Match
            { '$match': { userId: req.query.id } },
            // Project
            { '$project': { password: 0, refreshToken: 0, createdAt: 0, updatedAt: 0, _id: 0, __v: 0 } }
        ]);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.ClientProfile = ClientProfile;
