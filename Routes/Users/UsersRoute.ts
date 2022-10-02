import { getUser } from "../../Controller/Service/Users/UsersController"
import UploadTest from "../../Controller/Service/Upload/Test/"
import { uploadSingle } from "../../Utils/Multer"
const { verify } = require('../../MiddleWare/TokenMiddleware')
const express = require('express')
const router = express.Router()

router.get('/', verify, getUser)
router.post('/changeavatar', [verify, (req: any, res: any) => {
    uploadSingle(req, res, (err: any) => {
        if (err) return res.status(302).json(err)
        UploadTest(req,res)
    })
}])

module.exports = router