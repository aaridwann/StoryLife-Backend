import { AbortBooking } from '../../../Controller/Service/Booking/Abort Booking/AbortBooking'
import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
require('dotenv').config()
const url = process.env.DB_URL
beforeAll(async () => {
    if (!url) return false
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})
let id = new ObjectId('62cad45cc5848adaa4419e58')

describe('abort booking unit test', () => {
    test('should failed', async () => {
        expect(await AbortBooking('62c66ea95ac96c55a8665693', id)).toEqual({ state: false, message: 'abort booking failed' })
    })
    test('should success', async () => {
        id = new ObjectId('62cae31e2ab2e571ae69741b')
        expect(await AbortBooking('62c66ea95ac96c55a8665693', id)).toEqual({ state: true, message: 'success abort booking' })
    })
})