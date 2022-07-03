"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const supertest_1 = __importDefault(require("supertest"));
describe('Test Supertest', () => {
    test('Response test', async () => {
        let res = await (0, supertest_1.default)(app_1.app)
            .post('/');
        expect(res.status).toBe(400);
        expect(res.body).toEqual('request body not found');
    });
    test('With body', async () => {
        let res = await (0, supertest_1.default)(app_1.app)
            .post('/')
            .send({ name: 'ridwan' });
        expect(res.status).toBe(200);
        expect(res.body).toBe('ridwan');
    });
});
