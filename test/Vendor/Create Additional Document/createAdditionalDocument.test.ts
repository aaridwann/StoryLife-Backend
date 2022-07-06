import mongoose from "mongoose";
import {CreateAdditionalDocument} from '../../../Controller/Service/Vendor/User To Vendor/Create Additional Document/CreateAdditionalDocument'
require('dotenv').config()
const url = process.env.DB_URL
beforeAll(async () => {
    if (!url) return false
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})

describe('Create additional Document Vendor', () => {
    test('Success create' , async () => {
        expect(await CreateAdditionalDocument('62c51304fe4f3babdc6264f3','grabit photo')).toEqual({state:true,message:'ok'})
    })
})
