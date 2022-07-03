"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendors = void 0;
const VendorController_1 = require("../VendorController");
const vendors = async (req, res) => {
    let getVendors = await (0, VendorController_1.getVendor)(req, res);
    // let date = getVendors.map((x:any) => x.name)
    // 
    // return res.json(date)
};
exports.vendors = vendors;
