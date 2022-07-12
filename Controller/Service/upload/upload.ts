import { Response } from "express";
import { googleUpload } from './googleapi'
const fs = require('fs');
const multer = require('multer')
var path = require('path')

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, './upload/img')
        console.log(file)
    },
    filename: async (req: any, file: any, cb: any) => {
        const uniq = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        const name = file.fieldname + '-' + uniq + ext
        cb(null, name)
    }
})
export const upload = multer({ storage: storage }).single('avatar')

export const uploadBasic = async (req: any, res: Response) => {
    // await googleUpload(req.file.path)
    // console.log(req.file)
    // console.log(data)
    return res.json('data')
}