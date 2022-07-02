import { CreateEventDocument } from "../../Controller/Service/Create Document/CreateEventDocument";
import mongoose from "mongoose";
require('dotenv').config()
let url = process.env.DB_URL

beforeAll(async () => {
    if (!url) return false
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})

describe('create event docs', () => {
    test('success', async () => {
        expect(await CreateEventDocument('hahihuheho', 'ridwan')).toBe(true)
    })
})