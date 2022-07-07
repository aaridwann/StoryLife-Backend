import { AddEvent } from "../../Controller/Service/Event/AddEvent"
import { deleteEvent } from "../../Controller/Service/Event/DeleteEvent"
import { EditEvent } from "../../Controller/Service/Event/EditEvent"
import ClientMiddleware from "../../MiddleWare/ClientMiddleware"
const { verify } = require('../../MiddleWare/TokenMiddleware')
const express = require('express')
const router = express.Router()



router.post('/add', verify, ClientMiddleware, AddEvent)
router.put('/:id', verify, ClientMiddleware, EditEvent)
router.delete('/:id', verify, ClientMiddleware, deleteEvent)




module.exports = router