import mongoose from "mongoose";
import { removeFollowing } from "../../../Controller/Follow/Unfollow";
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


describe('remove following test unit', () => {
    test('user not found', async () => {
        expect(await (removeFollowing('62bb152a0d650fe80159d10a', 'abcd'))).toEqual({ state: false, message: 'user not found' })
    })
    test('unfollow failed', async () => {
        expect(await (removeFollowing('62bb152a0d650fe80159d101', 'abcd'))).toEqual({ state: false, message: 'unfollow failed' })
    })
    test('remove testing success', async () => {
        expect(await (removeFollowing('62bb152a0d650fe80159d101', 'abc'))).toEqual({ state: true, message: 'ok' })
    })
})
