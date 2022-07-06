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
    test('not found acount', async () => {
        expect(await CheckBallance('askdhaks', '62c4111435d23b7efe6bd870', 10000)).toEqual({ state: false, message: 'account not found' })
    })
    test('minmal transfer false', async () => {
        expect(await CheckBallance('62c4074a179607943f25660c', '62c4111435d23b7efe6bd870', 9000)).toEqual({ state: false, message: 'minimal transfer 10.000' })
    })
    test('ballance is not enough', async () => {
        expect(await CheckBallance('62c4074a179607943f25660c', '62c4111435d23b7efe6bd870', 22000)).toEqual({ state: false, message: 'balance is not enough' })
    })
    test('ballance is not enough With pas pasan', async () => {
        expect(await CheckBallance('62c4074a179607943f25660c', '62c4111435d23b7efe6bd870', 20000)).toEqual({ state: false, message: 'balance is not enough' })
    })
    test('ballance is ok 19.000', async () => {
        expect(await CheckBallance('62c4074a179607943f25660c', '62c4111435d23b7efe6bd870', 19000)).toEqual({ state: true, message: { user: { userId: '62c4074a179607943f25660c', balance: 1000 }, target: { userId: '62c4111435d23b7efe6bd870', balance: 0 } } })
    })
})