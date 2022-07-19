

import { AbortSales } from '../../../Controller/Service/Booking/Abort Booking/Abort Sales Package'
import mongoose from 'mongoose'
require('dotenv').config()
const url = process.env.DB_URL
beforeAll(async () => {
    if (!url) return false
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})

describe('Abort Sales unit testing', () => {
    test('abort test success', async () => {
        expect(await AbortSales('62c70d083e720909ac3d55ba',1)).toEqual({ state: true, message: 'success abort sales' })
    })
})