const { eventDb } = require('../../Models/EventModels')
import mongoose from "mongoose"
let url = 'mongodb://localhost:27017/StoryLife'

beforeAll(async () => {
    await mongoose.connect(url)
})



describe('Test Connetion event Models', () => {
    test('test find data in event Models', async () => {
        let res = await eventDb.findOne()
        expect(res).toEqual(res)
    })
})