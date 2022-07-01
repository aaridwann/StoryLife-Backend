import mongoose from 'mongoose'
let url = 'mongodb://localhost:27017/StoryLife'
const { CreateEventDocument } = require('./CreateEventDocument')

beforeAll(async () => {
    await mongoose.connect(url)
})

describe('Testing Create event document', () => {


    test('Create is success', () => {
        expect( CreateEventDocument('625acf909f5986c218a0260a', 'maya@gmail.com')).toEqual({ status: true, message: 'success' })
    })

})