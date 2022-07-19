"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddEvent_1 = require("../../Controller/Service/Event/AddEvent");
const DeleteEvent_1 = require("../../Controller/Service/Event/DeleteEvent");
const EditEvent_1 = require("../../Controller/Service/Event/EditEvent");
const ClientMiddleware_1 = __importDefault(require("../../MiddleWare/ClientMiddleware"));
const { verify } = require('../../MiddleWare/TokenMiddleware');
const express = require('express');
const router = express.Router();
router.post('/add', verify, ClientMiddleware_1.default, AddEvent_1.AddEvent);
router.put('/:id', verify, ClientMiddleware_1.default, EditEvent_1.EditEvent);
router.delete('/:id', verify, ClientMiddleware_1.default, DeleteEvent_1.deleteEvent);
module.exports = router;
