"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packageDb = require('../Models/PackageModels');
const CategoryPackage = require('../Models/PackageModels');
class Package {
    constructor(req, res) {
        this.vendor = {
            _id: '',
            vendorId: '',
            name: '',
            email: '',
            iat: '',
            exp: '',
        };
        this.package = {
            packageName: '',
            category: typeof CategoryPackage,
            price: 0,
            details: '',
            discount: 0
        };
        if (!req.body) {
            return res.json({ message: 'Paket Tidak ada' });
        }
        this.vendor = req.vendor;
        this.package = req.body;
        this.package.price -= this.package.discount;
    }
    // Method Add
    async addPackage(res) {
        let check1 = await packageDb.findOne({ vendorId: this.vendor.vendorId });
        if (check1 == null) {
            let created = await new packageDb({
                vendorId: this.vendor.vendorId,
                vendorName: this.vendor.name,
                package: this.package
            }).save((err) => {
                if (err) {
                    return res.json(err.message);
                }
                return res.json({ data: created, message: 'Data berhasil dibuat' });
            });
        }
        else {
            // Bug Enum pada Package
            let add = await packageDb.updateOne({ vendorId: this.vendor.vendorId }, { $push: { package: this.package } })
                .catch((err) => {
                return res.json(err);
            });
            return res.json(add);
        }
    }
    // Method Delete
    async deletePackage(req, res) {
        if (!req.params.id) {
            return res.json({ message: 'params not Found' });
        }
        // middleware vendor authorization 
        let check = await packageDb.findOne({ 'package._id': req.params.id });
        if (check.vendorId !== this.vendor.vendorId) {
            return res.json('Your vendor un Authorization | bukan vendor anda');
        }
        let deletePackage = await packageDb.updateOne({ idVendor: this.vendor.vendorId, $pull: { package: { _id: req.params.id } } });
        return res.status(201).json({ message: 'Success Delete', data: deletePackage });
    }
    // Method Edit
    async editPackage(req, res) {
        const data = {
            packageName: req.body.packageName,
            category: req.body.category,
            price: req.body.price - req.body.discount,
            details: req.body.details,
            discount: req.body.discount
        };
        // middleware vendor authorization 
        let check = await packageDb.findOne({ 'package._id': req.params.id });
        if (check.vendorId !== this.vendor.vendorId) {
            return res.json('Your vendor un Authorization | bukan vendor anda');
        }
        // Save edit
        try {
            let edit = await packageDb.updateOne({ vendorId: this.vendor.vendorId, 'package._id': req.params.id }, {
                $set: {
                    'package.$.packageName': data.packageName.toLowerCase(), 'package.$.category': data.category, 'package.$.price': data.price,
                    'package.$.details': data.details, 'package.$.discount': data.discount
                }
            });
            return res.status(201).json({ message: 'Success edited', data: edit });
        }
        catch (err) {
            res.status(400).json({ mssage: 'Error', data: err });
        }
    }
}
module.exports = Package;
