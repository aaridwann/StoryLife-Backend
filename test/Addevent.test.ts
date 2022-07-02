const { AddEventFunction } = require('./AddEventFunction')
import { EventList } from "../Models/EventModels"
import mongoose from "mongoose"
let url = 'mongodb://localhost:27017/StoryLife'

beforeAll(async () => {
    await mongoose.connect(url)
})

describe('Add event Test', () => {



    test('no data Event', async () => {
        let req = {
            body: {
                eventName: '',
                eventDate: 3645364563453,
                eventLocation: { street: 'cipocok', city: 'Serang', province: 'banten', state: 'indonesia' },
                eventCategory: 'wedding',
                vendor: ['photography', 'videography'],
            },
            user: {
                _id: '625acf909f598628a8b245889bd14605d5b126c218a0260a'
            }
        }
        let exec = await AddEventFunction(req)
        expect(exec).toEqual({ state: false, message: 'check your input' })
    })

    test('already event', async () => {
        let req = {
            body: {
                eventName: 'Wedding Royale',
                eventDate: 3645364563453,
                eventLocation: { street: 'cipocok', city: 'Serang', province: 'banten', state: 'indonesia' },
                eventCategory: 'wedding',
                vendor: ['photography', 'videography'],
            },
            user: {
                _id: '628a8b245889bd14605d5b12'
            }
        }
        let exec = await AddEventFunction(req)
        console.log(exec)
        // expect(exec).toBe('Event sudah ada')
    })

    // test('success', async () => {
    
    // })

})
