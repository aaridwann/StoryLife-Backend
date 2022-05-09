import { query, Response } from 'express'
import { ObjectId } from 'mongodb'
import { categoryProject } from '../Models/ProjectModels'
import { Vendor } from './BookingController'
const projectDb = require('../Models/ProjectModels')
interface Location {
    street: string,
    city: string,
    province: string,
    state: string
}
interface Project {
    name: string,
    date: string,
    location: Location,
    category: typeof categoryProject
    vendorList: Array<string>
}

export interface User {
    _id: String,
    name: String,
    email: String,
    iat: String,
    exp: String
}
// Middleware Duplicate name Function
async function duplicateName(req: { body: Project, user: User }) {
    let name = await projectDb.findOne({ name: { $regex: req.body.name, $options: 'i' }, userId: req.user._id })
    if (name === null) {
        return true
    } else {
        return false
    }
}

// Get Project by Query
export const getProjectById = async (req: { headers: any, query: { id: string, name: string, category: string } }, res: Response) => {
    let { name, id, category } = req.query
    let regName = new RegExp(`${name}`, `ig`)
    let regCategory = new RegExp(`${category}`, `ig`)
    try {
        let response = await projectDb.find({
            $or: [{ _id: id },
            { name: { $regex: regName } },
            { category: { $regex: regCategory } }]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

// Add Project
export const addProject = async (req: { body: Project, user: User }, res: Response) => {

    // MiddleWare
    // Check already name in database 
    let cekName = await duplicateName(req)
    if (!cekName) {
        return res.status(400).json('duplicate name event')
    }

    // Req from Middleware user
    const { _id } = req.user

    // Data Initialize
    let data: Project = {
        name: req.body.name.toLowerCase().trim(),
        date: req.body.date,
        location: {
            'street': req.body.location.street.toLowerCase().trim(),
            'city': req.body.location.city.toLowerCase(),
            'province': req.body.location.province.toLowerCase().trim(),
            'state': req.body.location.state.toLowerCase().trim()
        },
        category: req.body.category,
        vendorList: req.body.vendorList
    }
    if (!data.name || !data.date || !data.location.state || !data.location.city || !data.location.province || !data.location.street || !data.category || !data.vendorList) {
        return res.status(400).json({ message: 'data tidak lengkap', format: data })
    }


    // Configuration request body Date from string to Date Type
    let dateData = req.body.date.split(' ')
    let monthArr = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    let month = monthArr.findIndex((e) => e == dateData[1])
    let date = new Date(parseInt(dateData[2]), month, parseInt(dateData[0]) + 1)


    // Configuration Vendor from array to array Object
    let vendor = data.vendorList.map((x) => {
        let key = {
            vendorCategory: x,
        }
        return key
    })

    // Add Project Mongo Query
    try {
        await new projectDb({
            userId: _id,
            name: data.name,
            date: date,
            location: data.location,
            category: data.category,
            vendor: vendor
        })
            .save((err: string) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(201).send({ message: 'Success added' })
            })

    } catch (error) {
        res.status(500).json(error);
    }

}


// Update Project
export const editProject = async (req: { body: Project, user: User, params: { id: string } }, res: Response) => {
    let dataEdit: Project = {
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category,
        vendorList: req.body.vendorList
    }

    // Check Event Ada atau tidak ada
    try {
        let check = await projectDb.findOne({ _id: req.params.id, userId: req.user._id })
        if (!check) {
            return res.status(400).json('Event tidak ada')
        }
    } catch (error) {
        return res.status(400).json({ message: 'Event Tidak ada', data: error })
    }

    // Update Project
    try {
        let edit = await projectDb.updateOne({ _id: req.params.id, userId: req.user._id }, { $set: dataEdit })
        return res.json({ message: 'Berhasil edit', data: edit })
    } catch (error) {
        return res.json(error)
    }

}

// Delete Project
export const deleteProject = async (req: { params: { id: string }, user: User }, res: Response) => {

    try {
        let destroy = await projectDb.deleteOne({ _id: req.params.id, userId: req.user._id })
        if (!destroy) {
            return res.status(400).json({ message: 'event tidak ada', data: destroy })
        }
        return res.status(201).json({ message: 'Berhasil delete', data: destroy })
    } catch (error) {
        return res.status(400).json({ message: 'Event tidak ada', data: error })
    }
}

// Delete Vendor
export const deleteVendor = async (req: { query: { idEvent: string, nameEvent: string, vendorId: string, vendorName: string } }, res: Response) => {

    let { idEvent, nameEvent, vendorId, vendorName } = req.query
    if (!idEvent || !nameEvent || !vendorId || !vendorName) {
        return res.status(400).json({ message: 'Data Tidak lengkap', FormatData: 'idEvent, nameEvent, vendorId, vendorName  ' })
    }
    try {
        let response = await projectDb.updateOne({ _id: new ObjectId(idEvent), name: { $regex: nameEvent, $options: 'i' }, 'vendor.vendorId': vendorId, 'vendor.vendorName': { $regex: vendorName, $options: 'i' } },
            { $unset: { 'vendor.$': { 'vendorName': '', vendorId: '', vendorAddress: '', vendorPhone: '', notes: '', package: '' } } })
        res.json({ message: 'Success Delete Vendor', data: response })
    } catch (error) {
        res.status(400).json({ message: 'Vendor Tidak ada', data: error })
    }
}


// Callbacks UPDATE Vendor Project Add Vendor
export const addVendor = async (event: { eventId: string }, vendor: Vendor, res: Response, msgAdd: string) => {
    // total
    let total = vendor.package.map((x: { total: number }) => x.total)

    // Update push Vendor on project
    try {
        await projectDb.updateOne({ _id: event.eventId, 'vendor.vendorCategory': `${vendor.vendorCategory}` },
            { $set: { 'vendor.$': vendor }, $inc: { totalCost: `${total}` } })
        return msgAdd = 'Add Vendor Success'
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
    // console.log({ message: 'Berhasil disimpan', data: addVendor })
}