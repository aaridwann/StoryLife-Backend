import mongoose from "mongoose";
import { removeFollower } from "../../../Controller/Follow/Unfollow";
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


describe('remove followers testing unit', () => {
    test('user not found', async () => {
        expect(await removeFollower('hehehe', 'hehehe')).toEqual({ state: false, message: 'user not found' })
    })
    test('remove follower is failed', async () => {
        expect(await removeFollower('hehe', '62bb15350d650fe80159d10d')).toEqual({ state: false, message: 'remove follower is failed' })
    })
    test('success', async () => {
        expect(await removeFollower('abc', '62bb15350d650fe80159d10d')).toEqual({ state: true, message: 'ok' })
    })
})