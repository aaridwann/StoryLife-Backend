const { AddBookingFunction } = require('./AddBookingFunction')
import mongoose from "mongoose"
let url = 'mongodb://localhost:27017/StoryLife'

beforeAll(async () => {
    await mongoose.connect(url)
})

describe('Add Booking function', () => {
    let req = {
        body: {
            client: { clientId: '625acf909f5986c218a0260a' },
            vendor: { vendorId: '625ad1f028e8cd8520fec38a' },
            event: { eventId: 'weswew' }
        }
    }

    test('Check user', async () => {
        await AddBookingFunction(req)
    })




})