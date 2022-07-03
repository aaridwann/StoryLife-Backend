"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventDocument = void 0;
const EventModels_1 = require("../../../Models/EventModels");
const CreateEventDocument = async (id, username) => {
    try {
        let res = new EventModels_1.eventDb({ userId: id, userName: username, event: [] });
        let exec = await res.save();
        if (!exec) {
            console.log(exec);
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.CreateEventDocument = CreateEventDocument;
