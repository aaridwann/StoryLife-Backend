import { Response, NextFunction } from 'express'
import { categoryProject } from '../Models/ProjectModels'
const projectDb = require('../Models/ProjectModels')
interface Location {
    street: string,
    city: string,
    province: string,
    state: string
}
interface Project {
    name: string,
    date: Date,
    location: Location,
    category: typeof categoryProject
    vendorList: Array<string>
}

interface User {
    _id: string,
    name: string,
    email: string,
    iat: string,
    exp: string
}
async function duplicateName(req: { body: Project, user: User }): Promise<boolean> {
    let name = await projectDb.findOne({ name: req.body.name, userId: req.user._id })
    if (name) {
        return false
    } return true
}

export const getProjectById = async (req: { query: { id: string, name: string } }, res: Response) => {
    let { name, id } = req.query
    res.send([name, id])
}

export const addProject = async (req: { body: Project, user: User }, res: Response) => {

    let cek = await duplicateName(req)
    if (!cek) {
        return res.status(400).json('duplicate name event')
    }
    const { _id } = req.user
    let data: Project = {
        name: req.body.name,
        date: req.body.date,
        location: {
            street: req.body.location.street,
            city: req.body.location.city,
            province: req.body.location.province,
            state: req.body.location.state
        },
        category: req.body.category,
        vendorList: req.body.vendorList
    }
    if (!data.name || !data.date || !data.location.state || !data.location.city || !data.location.province || !data.location.street || !data.category || !data.vendorList) {
        return res.json('data tidak lengkap')
    }


    const vendor = Object.assign({}, ...data.vendorList.map((key: string) => ({
        [key]: []
    })));

    // Add Project
    try {
        await new projectDb({
            userId: _id,
            name: data.name,
            date: data.date,
            location: data.location,
            category: data.category,
            vendor: vendor
        }).save((err: string) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).send({ message: 'Success added' })
        })
    } catch (error) {
        res.status(500).json(error);
    }


}

export const editProject = async (req: { body: Project, user: User, params: { id: string } }, res: Response) => {
    let dataEdit: Project = {
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category,
        vendorList: req.body.vendorList
    }

    try {
        let check = await projectDb.findOne({ _id: req.params.id, userId: req.user._id })
        if (!check) {
            return res.status(400).json('Event tidak ada')
        }
    } catch (error) {
        return res.status(400).json({ message: 'Event Tidak ada', data: error })
    }


    try {
        let edit = await projectDb.updateOne({ _id: req.params.id, userId: req.user._id }, { $set: dataEdit })
        return res.json({ message: 'Berhasil edit', data: edit })
    } catch (error) {
        return res.json(error)
    }

}

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



export const addVendor = async (event: any, vendor: any, client: object, res: Response) => {
    let kategori = 'vendor.' + vendor.vendorCategory

    // Update push Vendor on project
    let addVendor = await projectDb.updateOne({ _id: event.eventId }, { $push: { [kategori]: vendor } })
    return res.json({ message: 'Berhasil disimpan', data: addVendor })
}