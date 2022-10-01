"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToVendor = void 0;
const VendorsModels_1 = require("../../../../Models/VendorsModels");
const UsersModels_1 = require("../../../../Models/UsersModels");
const mongodb_1 = require("mongodb");
const CreateAdditionalDocument_1 = require("./Create Additional Document/CreateAdditionalDocument");
const AbortDocumentVendor_1 = require("./Create Additional Document/AbortDocumentVendor");
const userToVendor = async (req, res) => {
    const body = req.body;
    body.vendorId = req.user._id;
    // 1. check user status
    const userCheck = await checkUser(req.user._id);
    if (!userCheck.state) {
        return res.json(userCheck);
    }
    // 2. insert into Vendor
    const createVendor = await insertVendor(body);
    if (!createVendor.state) {
        return res.json(createVendor);
    }
    // 3. create additional vendor document
    const createAdditional = await (0, CreateAdditionalDocument_1.CreateAdditionalDocument)(req.user._id, req.body.vendorName);
    if (createAdditional.state == false) {
        await (0, AbortDocumentVendor_1.AbortAdditionalDocument)(req.user._id);
        return res.status(400).json(createAdditional);
    }
    return res.status(201).json({ state: true, message: 'success created vendor' });
};
exports.userToVendor = userToVendor;
// 1. checkStatus user
const checkUser = async (userId) => {
    try {
        const check = await UsersModels_1.userDb.findOne({ _id: new mongodb_1.ObjectId(userId) });
        if (!check || check.vendor == true) {
            return { state: false, message: 'you has been vendor' };
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
// 2. Insert Vendor 
const insertVendor = async (data) => {
    try {
        let insert = new VendorsModels_1.vendor(data);
        const save = await insert.save();
        if (!save) {
            return { state: false, message: 'insert failed' };
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
