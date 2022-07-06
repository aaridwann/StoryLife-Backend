import mongoose from 'mongoose'
import { TransferBallance } from '../../../Controller/Service/Ballance/Transfer'
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

describe("Tranfer proccess testing unit", () => {
    test('failed transfer', async () => {
        expect(await TransferBallance('62c4101535d23b7efe6bd869', 0, 19000)).toEqual({ state: false, message: 'transfer failed' })
    })
    test('success transfer', async () => {
        expect(await TransferBallance('62c4101535d23b7efe6bd864', 19000, 19000)).toEqual({ state: true, message: 'ok' })
    })
})