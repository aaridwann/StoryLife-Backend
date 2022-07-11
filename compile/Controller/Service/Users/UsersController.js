"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProfile = exports.getUserById = exports.getallUsers = void 0;
const UsersModels_1 = require("../../../Models/UsersModels");
const getallUsers = async (req, res) => {
    const response = await UsersModels_1.userDb.find({}, { name: 1, _id: 1, email: 1 });
    res.status(200).json({ data: response, message: 'Success Loaded' });
};
exports.getallUsers = getallUsers;
// Check email Register Real Time
const getUserById = async (req, res) => {
    let user = await UsersModels_1.userDb.findOne(req.query);
    if (user) {
        return res.json(false);
    }
    res.json(true);
};
exports.getUserById = getUserById;
// Controller for client Profile
const ClientProfile = async (req, res) => {
    try {
        let response = await UsersModels_1.userDb.aggregate([
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
