import mongoose from 'mongoose'
let url = 'mongodb://localhost:27017/StoryLife'
const { DetailPackage } = require('./DetailPackage')
beforeAll(async () => {
    mongoose.connect(url)
})

test('Id not Found', async () => {
    let req = { query: { id:'625ad52b044a7fb494b50bd3' } }
    await DetailPackage(req)
})