"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddEventFunction_1 = require("../../Controller/Service/Add Event/AddEventFunction");
const ProjectController_1 = require("../../Controller/ProjectController");
const ClientMiddleware_1 = __importDefault(require("../../MiddleWare/ClientMiddleware"));
const { verify } = require('../../MiddleWare/TokenMiddleware');
const express = require('express');
const router = express.Router();
// Get Project
router.get('/', verify, ProjectController_1.getProjectById);
// Add Project Route
router.post('/addproject', verify, ClientMiddleware_1.default, AddEventFunction_1.AddEventFunction);
// Edit Project
router.put('/edit/:id', verify, ClientMiddleware_1.default, ProjectController_1.editProject);
// Delete Project
router.delete('/delete/:id', verify, ClientMiddleware_1.default, ProjectController_1.deleteProject);
// Delete Vendor
router.delete('/vendor', verify, ClientMiddleware_1.default, ProjectController_1.deleteVendor);
module.exports = router;
