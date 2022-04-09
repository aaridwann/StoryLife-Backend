const projectDb = require('../Models/ProjectModels')
const categoryVendor = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']

export const getProjectById = async (req: any, res: any) => {
    let { name, id } = req.query
    res.send([name, id])
}

export const addProject = async (req: any, res: any) => {


    const { userId, name, date, location, categories, vendor, totalCost } = req.body
    if (!userId || !name || !date || !location || !categories) {
        return res.status(400).json('data kosong')
    }
    if (req.user._id !== userId) {
        return res.status(400).json({ message: 'userId tidak sama' })
    }

    try {
        const total = vendor.map((x: { name: string, total: number }) => x.total).reduce((a: number, b: number) => a + b)
        let response = await new projectDb({
            userId: userId,
            name: name,
            date: date,
            location: location,
            categories: categories,
            vendor: vendor,
            totalCost: total,
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