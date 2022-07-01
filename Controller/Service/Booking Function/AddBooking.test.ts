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
            booking: { eventId: '62871acb105877ec84f06e68', eventName: 'wedding royal' },
            packages: { _id: '625ad52b044a7fb494b50bd3' }
        }
    }

    test('Check user', async () => {
        await AddBookingFunction(req)
    })
})