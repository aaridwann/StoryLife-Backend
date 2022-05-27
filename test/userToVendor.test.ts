import mongoose from "mongoose";
import { userToVendor } from "../Controller/Function/Tobe Vendor/userToVendor";
let url = 'mongodb://localhost:27017/StoryLife'
import request from 'supertest'
import { app } from '../app'


test("No _id", async () => {
    let user = {
        user: {
            _id: 'alskhalhks',
        }
    }
    const req = await request(app)
        .post('/vendor/addvendor')
        .set('authorization', 'asas2a4s')
        .send(user)
    expect(req.body).toEqual("hahahah")
})

