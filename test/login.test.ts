import { response } from "express";
import { login } from "../Controller/AuthController";
import mongoose from 'mongoose'
let url = 'mongodb://localhost:27017/StoryLife'


beforeAll(async () => {
    await mongoose.connect(url)
})

test('login test', async () => {
    let req = { body: { email: 'muhajir@gmail.com', password: '1122334455' } }
    let exec = await login(req, response)
    expect(exec)
})