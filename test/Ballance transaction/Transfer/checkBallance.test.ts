import mongoose from 'mongoose'
import { CheckBallance } from '../../../Controller/Service/Ballance/Transfer'
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


describe('Check ballance module', () => {
    test('not found', async () => {
        expect(await CheckBallance('askdhaks')).toEqual({ state: false, message: 'account not found' })
    })
    test('check ballance', async () => {
        expect(await CheckBallance('62c2dd5861b6a8c1d0305401')).toEqual({ state: false, message: 'account not found' })
    })
})