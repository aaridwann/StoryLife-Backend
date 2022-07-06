import mongoose from 'mongoose'
import { RecordTransaction } from '../../../Controller/Service/Ballance/Transfer'
require('dotenv').config()
const url = process.env.DB_URL

beforeAll(async () => {
    if (!url) {
        return false
    }
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})

describe('recort testing unit', () => {
    test('suxxess Tested', async () => {
        expect(await RecordTransaction('62c51304fe4f3babdc6264f3', '62c515c0fbe6f9f4a9fbe8bc', 85000)).toEqual({ state: true, message: 'record success write' })
    })
})