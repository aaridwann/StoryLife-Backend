const createSchedule = require("./createSchedule");
const User = require("../Controller/ProjectController");
test('Format vendor shedule', () => {
    let user = {
        _id: '11213252',
        name: 'grabit Photo',
        email: 'Grabit@gmail.com',
        iat: 'wqew',
        exp: 'pqowep'
    }
    let vendor = 'Grabit'
    expect(createSchedule(user, vendor)).toBe({ vendorId: user._id, vendorName: vendor })
})