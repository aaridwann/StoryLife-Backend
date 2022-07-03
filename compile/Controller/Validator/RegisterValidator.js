"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = void 0;
const registerValidator = async (req, res) => {
    let { name, email, password } = req.body;
    let data = {
        name: name,
        email: email,
        password: password
    };
    res.json(data);
};
exports.registerValidator = registerValidator;
