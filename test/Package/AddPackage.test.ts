import mongoose from "mongoose";
import { addPackage } from '../../Controller/Service/Package/AddPackage'
require('dotenv').config()
const url = process.env.DB_URL
let data = {
    vendor: {
        vendorId: '62c666b539add3eb62097dab'
    },
    body: {
        packageName: 'string',
        category: 'wedding',
        price: 15000000,
        details: 'string',
        discount: 0,
        image: 'string'
    }
}

beforeAll(async () => {
    if (!url) {
        return false
    }
    await mongoose.connect(url)
})

afterAll(async () => {
    await mongoose.connection.close()
})




describe('add package testing unit', () => {

    test('failed package is already', async () => {
        expect(await addPackage(data)).toEqual({ state: false, message: 'package already created' })
    })


    test('failed testing user not found', async () => {
        data.body.packageName = 'murmer'
        expect(await addPackage(data)).toEqual({ state: true, message: 'ok' })
    })

})