import mongoose from 'mongoose'
const { users } = require('../../../Models/UsersModels')
const { CreateBallanceAccount } = require('./CreateBallanceAccount')
let url = 'mongodb://localhost:27017/StoryLife'

describe('test Create account balance', () => {

    beforeAll(async () => {
        await mongoose.connect(url)
    })

    let notFound = 'users not found'
    let expectation = 'ballance account success created'
    let error = 'users has have account'

    test("Create Account Balance", async () => {
        // expect(await CreateBallanceAccount('adit@gmail.com', users)).toBe(expectation)
        // expect(await CreateBallanceAccount('memek@gmail.com', users)).toBe(notFound)
        
        // await CreateBallanceAccount('adit@gmail.com',users)
            expect(await CreateBallanceAccount('adit@gmail.com', users)).toBe(error)
    })
    // afterEach(async () => {
    //     expect(await CreateBallanceAccount('adit@gmail.com', users)).toEqual(error)
    // })

})
