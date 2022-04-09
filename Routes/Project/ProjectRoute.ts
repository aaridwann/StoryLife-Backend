import { addProject, getProjectById } from "../../Controller/ProjectController"

const { verify } = require('../../MiddleWare/TokenMiddleware')
const express = require('express')
const router = express.Router()

router.get('/', verify, getProjectById)
router.post('/addproject', verify, addProject)

module.exports = router