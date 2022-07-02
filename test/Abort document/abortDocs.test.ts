import { abortRegister } from "../../Controller/Service/Auth/RegisterService";
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


describe('abort testing unit',() => {
    test('Abort test',async () => {
        expect(await abortRegister('62c044a647cf75d89bafcd06')).toEqual({ state: true, message: 'all document success abort'})
    })
})