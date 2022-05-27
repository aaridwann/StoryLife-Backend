import { app } from './app'
import request from 'supertest'


describe('Test Supertest', () => {
    test('Response test', async () => {
        let res = await request(app)
            .post('/')
        expect(res.status).toBe(400)
        expect(res.body).toEqual('request body not found')
    })

    test('With body', async () => {
        let res = await request(app)
            .post('/')
            .send({name:'ridwan'})
            expect(res.status).toBe(200)
            expect(res.body).toBe('ridwan')
    })

})