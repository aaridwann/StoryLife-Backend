import mongoose from "mongoose";
import { followBack } from "../../../Controller/Service/Follow/Unfollow"
require('dotenv').config()
const url = process.env.DB_URL

beforeAll(async () => {
    if (!url) {
        return false
    }
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})


describe('followback testing unit', () => {
    test('success', async () => {
        expect(await followBack('62bb152a0d650fe80159d10d', 'abc')).toEqual({ state: false, message: 'following back is fail' })
    })
    test('success', async () => {
        expect(await followBack('62bb152a0d650fe80159d101', 'abc')).toEqual({ state: true, message: 'following back is success' })
    })
})
