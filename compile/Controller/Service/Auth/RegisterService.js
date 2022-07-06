"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortRegister = exports.RegisterService = void 0;
const UsersModels_1 = require("../../../Models/UsersModels");
const abortBallance_1 = require("../Abort Document/abortBallance");
const abortBooking_1 = require("../Abort Document/abortBooking");
const abortEvent_1 = require("../Abort Document/abortEvent");
const abortFollow_1 = require("../Abort Document/abortFollow");
const abortUser_1 = require("../Abort Document/abortUser");
const CreateBallanceAccount_1 = require("../Create Document/CreateBallanceAccount");
const CreateBookingDocument_1 = require("../Create Document/CreateBookingDocument");
const CreateEventDocument_1 = require("../Create Document/CreateEventDocument");
const CreateFollowDb_1 = require("../Create Document/CreateFollowDb");
const bcrypt = require('bcrypt');
const RegisterService = async (req, res) => {
    // Validator
    let validator = await validationRequest(req.body);
    if (!validator.state) {
        return res.status(400).json(validator.message);
    }
    // Hasing password
    let password = await hashingPassword(req.body.password);
    // Change password with hashing password & Trim name from body
    req.body.password = password;
    req.body.name = req.body.name.trim().toLowerCase();
    // input userDb
    try {
        let create = new UsersModels_1.userDb(req.body);
        let exec = await create.save();
        if (!exec) {
            return res.status(400).json('gagal');
        }
        // Create Additional Db
        let createDocs = await CreateAdditionalDb(req.body.email, req.body.name);
        // If create additional Failed  cancel all in create
        console.log({ 'info additional': createDocs.state });
        if (createDocs.state === false) {
            console.log(createDocs.id);
            const abort = await (0, exports.abortRegister)(createDocs.id);
            return res.status(400).json({ state: false, message: 'Regiter failed', logs: abort.message });
        }
        else {
            return res.status(201).json({ state: true, message: 'registered success' });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.RegisterService = RegisterService;
const validationRequest = async (req) => {
    let { email, password, name } = req;
    // init data
    if (!email || !password || !name) {
        return { state: false, message: 'check input data' };
    }
    // check length password
    if (password.toString().length < 5) {
        return { state: false, message: 'password minimum 5 character' };
    }
    // check already email
    let res = await UsersModels_1.userDb.findOne({ email: email });
    if (res) {
        return { state: false, message: 'email already used' };
    }
    else {
        return { state: true, message: 'ok' };
    }
};
const hashingPassword = async (password) => {
    let salt = 15;
    let hashingPassword = await bcrypt.hash(password.toString(), salt);
    return hashingPassword;
};
const CreateAdditionalDb = async (email, username) => {
    let id = await UsersModels_1.userDb.findOne({ email: email });
    if (!id) {
        return { state: false, message: 'data not found' };
    }
    id = id._id.toString();
    let event = await (0, CreateEventDocument_1.CreateEventDocument)(id, username);
    let ballance = await (0, CreateBallanceAccount_1.CreateBallanceAccount)(id, email, username);
    let follow = await (0, CreateFollowDb_1.CreateFollowDb)(id, username);
    let booking = await (0, CreateBookingDocument_1.CreateBookingDocument)(id, username);
    if (!ballance || !follow || !event || !booking) {
        return { state: false, id: id };
    }
    return { state: true, message: 'ok' };
};
const abortRegister = async (id) => {
    let ballance = await (0, abortBallance_1.abortBallance)(id);
    let user = await (0, abortUser_1.abortUser)(id);
    let event = await (0, abortEvent_1.abortEvent)(id);
    let follow = await (0, abortFollow_1.abortFollow)(id);
    let booking = await (0, abortBooking_1.abortBooking)(id);
    if (!ballance || !user || !event || !follow || !booking) {
        console.log({ ballance: ballance, follow: follow, event: event, booking: booking });
        return {
            state: false, message: {
                user: user.message,
                ballance: ballance.message,
                event: event.message,
                follow: follow.message,
                booking: booking.message
            }
        };
    }
    else {
        return { state: true, message: 'all document success abort' };
    }
};
exports.abortRegister = abortRegister;
