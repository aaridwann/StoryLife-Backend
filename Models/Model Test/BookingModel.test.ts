import mongoose from "mongoose"
const { bookingDb } = require('../BookingModels')
let url = 'mongodb://localhost:27017/StoryLife'

beforeAll(async () => {
    await mongoose.connect(url)
})

describe('Booking Models', () => {
    it('Insert userId without order', async () => {
        bookingDb.findOne({userId:'ridwan'})
        // await new bookingDb({ userId: 'yono',bookingList:[{nama:'yudis'}] }).save()
    })

})
