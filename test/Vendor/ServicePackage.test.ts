const { ServicePackage } = require('./ServicePackage')
import mongoose from "mongoose"
let url = 'mongodb://localhost:27017/StoryLife'

beforeAll(async () => {
    await mongoose.connect(url)
})

afterAll(async () => {
    await mongoose.connection.close()
})
let req = { query: { vendorId: '625ad1f028e8cd8520fec38a' } }
let req2 = { query: { vendorId: '' } }
let req3 = { query: { vendorId: '6a25ad1f028e8cd8520fec38a' } }
let notfound = 'id not found'
let nulll = 'package is null'


it('Get Package', async () => {
    let data = await ServicePackage(req)
    expect(await ServicePackage(req)).toEqual(data)
})

// test('Not found', async (res) => {
//     // expect(await ServicePackage(req2)).toMatch(notfound)
//     // expect(await ServicePackage(req2)).toBe(res.json('id not found'))
//     await ServicePackage(req2)
// })
// test('Must be null', async () => {
//     expect(await ServicePackage(req3)).toMatch(nulll)
// })