import mongoose from "mongoose";
import { editPackage } from '../../Controller/Service/Package/EditPackage'
require('dotenv').config()

beforeAll(async () => {
    if (!url) {
        return false
    }
    await mongoose.connect(url)
})

afterAll(async () => {
    await mongoose.connection.close()
})


const url = process.env.DB_URL
let data = {
    vendor: {
        vendorId: '62c666b539add3eb62097dab'
    },
    body: {
        packageName: 'aduaduaduadu...',
        category: 'minjem',
        price: 15000000,
        details: '',
        discount: 0,
        image: 'string'
    },
    params: {
        _id: '62c6b460eae22a7dd68d9afb'
    }
}

describe('edit package testing unit', () => {
    test('failed package details not found', async () => {
        expect(await editPackage(data)).toEqual({ state: false, message: 'package details not found' })
    })
    test('failed Category note correct', async () => {
        data.body.details = 'muehehehe'
        data.body.category = 'Ngentot'
        expect(await editPackage(data)).toEqual({ state: false, message: 'category not correct' })
    })

    test('success message ok', async () => {
        data.body.packageName = 'halah kintil'
        data.body.category = 'wedding'
        data.body.details = 'ngeheek bener dah'
        expect(await editPackage(data)).toEqual({ state: true, message: 'success update' })
    })

})