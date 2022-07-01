import mongoose from 'mongoose'
const { CreateFollowDb } = require("./CreateFollowDb");
const {users} = require('../../Models/UsersModels')
let url = 'mongodb://localhost:27017/StoryLife'


describe('Create table follow', () => {
    beforeAll(async () => {
        await mongoose.connect(url)
    })

    test('Create Follow db', async () => {
        await CreateFollowDb('aaridwann@gmail.com',users)
    })
})
