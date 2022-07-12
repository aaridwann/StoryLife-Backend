import { buffer } from "stream/consumers"

const img = './upload/img/avatar-1657531590509-975808730.jpg'

const bfr = Buffer.from(img)
const wrt = buffer(bfr)

console.log(wrt)