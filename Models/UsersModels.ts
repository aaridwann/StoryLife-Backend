import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const users = new Schema({
    name:{type: 'string', required: true,unique:false},
    vendor:{type:'boolean', default: false},
    email:{type: 'string', required: true, unique:true},
    password:{type: 'string', required: true},
    refreshToken:{type: 'string', default: ''}
},{ timestamps: true })

module.exports = mongoose.model('users',users)