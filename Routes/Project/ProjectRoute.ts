import { AddEventFunction } from "../../Controller/Service/Event/AddEvent"
// import { deleteProject, deleteVendor, editProject, getProjectById } from "../../Controller/ProjectController"
import ClientMiddleware from "../../MiddleWare/ClientMiddleware"

const { verify } = require('../../MiddleWare/TokenMiddleware')
const express = require('express')
const router = express.Router()
// Get Project
// router.get('/', verify, getProjectById)
// Add Project Route
router.post('/addproject', verify, ClientMiddleware, AddEventFunction)
// Edit Project
// router.put('/edit/:id', verify, ClientMiddleware, editProject)
// Delete Project
// router.delete('/delete/:id', verify, ClientMiddleware, deleteProject)
// Delete Vendor
// router.delete('/vendor', verify, ClientMiddleware, deleteVendor)

module.exports = router