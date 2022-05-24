import { RegisterService } from "../Controller/Function/Register/RegisterService";
import mongoose from "mongoose";
import {Response} from 'express'
let url = 'mongodb://localhost:27017/StoryLife'

beforeAll(async () => {
    await mongoose.connect(url)
})


// test('input register not valid', async () => {
//     let req = {
//         body: {
//             name: 'Ridwan',
//             email: 'aaridwann',
//             password: '123'
//         }
//     }
//     let response = 'test'
//     let exec = await RegisterService(req, Response)
//     expect(exec).toEqual({ state: false, message: 'password minimum 5 character' })
//     console.log(exec)
// })

// test('no data input', async () => {
//     let req = {
//         body: {
//             name: 'Ridwan',
//             email: 'aaridwann',
//             password: ''
//         }
//     }
//     let response = 'test'
//     let exec = await RegisterService(req, Response)
//     expect(exec).toEqual({ state: false, message: 'check input data' })
//     console.log(exec)
// })

// test('email already used', async() => {
//     let req = {
//         body: {
//             name: 'Ridwan',
//             email: 'aaridwann@gmail.com',
//             password:'1122334455'
//         }
//     }
//     let response = 'test'
//     let exec = await RegisterService(req,Response)
//     expect(exec).toEqual({state:false,message:'email already used'})
//     console.log(exec)
// })

test('success', async () => {
    jest.useFakeTimers();
    let req = {
        body: {
            name: 'Ridwan',
            email: 'cahya@gmail.com',
            password: '1122334455'
        }
    }
    let response = 'test'
    let exec = await RegisterService(req, Response)
    console.log(exec)
    // expect(exec).toBe(true)
})

test('objest',() => {
    let test = {
        state:false,
        oke:'si[['
    }
    console.log(test.state)
})