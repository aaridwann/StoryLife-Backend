import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const users = new Schema({
    name: { type: String, required: true, unique: false ,lowercase:true,trim:true},
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    verify: { type: Boolean, default: false },
    vendor: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true ,lowercase:true,trim:true},
    password: { type: String, required: true ,minlength:4},
    refreshToken: { type: String, default: '' }
}, { timestamps: true })

export const userDb = mongoose.model('users', users)