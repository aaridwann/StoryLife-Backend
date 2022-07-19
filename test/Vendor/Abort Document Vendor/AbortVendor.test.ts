import mongoose from "mongoose";
import { AbortAdditionalDocument } from '../../../Controller/Service/Vendor/User To Vendor/Create Additional Document/AbortDocumentVendor'
require('dotenv').config()
const url = process.env.DB_URL
beforeAll(async () => {
    if (!url) return false
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})

describe('Abort additional Document Vendor', () => {
    test('Success Abort', async () => {
        expect(await AbortAdditionalDocument('62c515c0fbe6f9f4a9fbe8bc')).toEqual({ state: true, message: 'ok' })
    })
})
