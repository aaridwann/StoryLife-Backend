const fs = require('fs');
const Buffer = require('buffer')

const url = './upload/img/avatar-1657529273268-795490610.jpg'
const stream = fs.createReadStream(url)
// const buffer = Buffer.from(url)
console.log(stream)
// console.log(buffer)