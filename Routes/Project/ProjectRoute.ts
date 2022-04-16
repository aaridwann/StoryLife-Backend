import { addProject, deleteProject, editProject, getProjectById } from "../../Controller/ProjectController"
import ClientMiddleware from "../../MiddleWare/ClientMiddleware"

const { verify } = require('../../MiddleWare/TokenMiddleware')
const express = require('express')
const router = express.Router()

router.get('/', verify, getProjectById)
router.post('/addproject', verify,ClientMiddleware, addProject)
router.put('/edit/:id', verify,ClientMiddleware, editProject)
router.delete('/delete/:id', verify,ClientMiddleware, deleteProject)

module.exports = router