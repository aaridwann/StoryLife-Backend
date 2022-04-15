import { Response } from 'express'
const projectDb = require('../Models/ProjectModels')
const vendorDb = require('../Models/VendorsModels')
const categoryVendor = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']
interface Vendor {
    name: String,
    package: String,
}

export const getProjectById = async (req: any, res: any) => {
    let { name, id } = req.query
    res.send([name, id])
}

export const addProject = async (req: any, res: any) => {
    const { _id } = req.user
    const { name, date, location, categories, vendorList, totalCost } = req.body
    if (!_id || !name || !date || !location || !categories) {
        return res.status(400).json('data kosong')
    }
    const vendor = Object.assign({}, ...vendorList.map((key: string) => ({
        [key]: []
    })));


    // Add Project
    try {
        let response = await new projectDb({
            userId: _id,
            name: name,
            date: date,
            location: location,
            categories: categories,
            vendor: vendor
        }).save((err: string) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).send({ message: 'Success added', data: response })
        })
    } catch (error) {
        res.status(500).json(error);

    }
}

export const addVendor = async (event:any,vendor:any,client:object,res:Response) => {
    let kategori = 'vendor.'+vendor.vendorCategory
    
    // Update push Vendor on project
    let addVendor = await projectDb.updateOne({_id:event.eventId},{$push:{[kategori]:vendor}})
    return res.json({message:'Berhasil disimpan',data:addVendor})
}