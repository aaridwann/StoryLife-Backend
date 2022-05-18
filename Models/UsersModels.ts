import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const usersDb = new Schema({
    name: { type: String, required: true, unique: false },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    verify: { type: Boolean, default: false },
    vendor: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String, default: '' }
}, { timestamps: true })

export const users = mongoose.model('users', usersDb)