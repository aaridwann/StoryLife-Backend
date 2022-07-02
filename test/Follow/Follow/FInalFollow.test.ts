import { follow } from "../../../Controller/Service/Follow/Follow";
import { Response } from 'express'
require('dotenv').config()
import mongoose from "mongoose"
const url = process.env.DB_URL
beforeAll(async () => {
    if (!url) return false
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})


describe('Follow Head unit testing', () => {

    test('user id or id target not found', async () => {
        let data = {
            user: { _id: '' },
            params: { id: '' }
        }
        expect(await follow(data)).toEqual({ state: false, message: 'id user or id params not found' })
    })
    test('already following', async () => {
        let data = {
            user: { _id: '62bb152a0d650fe80159d101' },
            params: { id: 'abc' }
        }
        expect(await follow(data)).toEqual({ state: false, message: 'you already follow' })
    })

    test('Success Following', async () => {
        let data = {
            user: { _id: '62bb152a0d650fe80159d101' },
            params: { id: '62bb15350d650fe80159d10d' }
        }
        expect(await follow(data)).toEqual({ state: false, message: 'you already follow' })
    })

})