const { CreateBookingDocument } = require('./CreateBookingDocument')
import { ObjectId } from "mongodb"
import mongoose from "mongoose"
let url = 'mongodb://localhost:27017/StoryLife'

beforeAll(async () => {
    await mongoose.connect(url)
})

describe('Create Document booking in first register user', () => {

    test('Success create', async () => {
        expect(await CreateBookingDocument('comel')).toEqual(true)
    })

    test('duplicate testing', async () => {
        let id = 'kuyhaa'
        expect(await CreateBookingDocument(id)).toBeFalsy()

    })



})