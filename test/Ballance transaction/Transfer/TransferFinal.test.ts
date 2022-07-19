import mongoose from 'mongoose'
import { Transfer } from '../../../Controller/Service/Ballance/Transfer'
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

const data = {
    user: {
        _id: '62c51304fe4f3babdc6264f3'
    },
    params: {
        id: '62c515c0fbe6f9f4a9fbe8bc',
        amount: 19000
    }
}


describe("transfer Final unit test", () => {
  
  
    /*
     
    Test failed

    */
    test('failed test Minimal transfer', async () => {
        data.params.amount = 8000
        expect(await Transfer(data)).toEqual({ state: false, message: 'minimal transfer 10.000' })
    })

    test('failed test Account not found', async () => {
        data.user._id = '62c4074a179607943f25660F'
        data.params.amount = 19000
        expect(await Transfer(data)).toEqual({ state: false, message: 'account not found' })
    })
    
    test('failed test Balance is not enough', async () => {
        data.user._id = '62c51304fe4f3babdc6264f3'
        data.params.amount = 25000000
        expect(await Transfer(data)).toEqual({ state: false, message: 'balance is not enough' })
    })
    
    // test('failed Test Transfer failed', async () => {
    //     data.params.amount = 19000
    //     expect(await Transfer(data)).toEqual({ state: false, message: 'transfer failed' })
    // })

    // Success Transfer test
    
    test('Success Test', async () => {
        data.params.amount = 19000
        expect(await Transfer(data)).toEqual({ state: true, message: 'transfer success' })
    })

})