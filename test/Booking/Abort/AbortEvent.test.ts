import { AbortEvent } from '../../../Controller/Service/Booking/Abort Booking/AbortEvent'
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

const pckg = {
    packageName: "minimalist",
    category: "engagement",
    price: 4500000,
    details: "pilihan yang sempurna agar wedding anda menjadi sempurna",
    discount: 0,
    image: "",
    date: 1657212095198,
    _id: 'c70d083e720909ac3d55ba',
    sales: 0
}

describe('abort event unit testing', () => {
    test('abort test success', async () => {
        expect(await AbortEvent('62c97dddd607694b311db0e8', 'photography', pckg)).toEqual({ state: true, message: 'abort event success' })
    })
})
