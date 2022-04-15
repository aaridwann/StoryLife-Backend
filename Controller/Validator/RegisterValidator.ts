import { Response, Request } from "express"

interface User {
    name: String
    email: String
    password: String
}

export const registerValidator = async (req: Request, res: Response) => {
    let{name,email,password} = req.body

    let data:User= {
        name: name,
        email: email,
        password: password
    }
    res.json(data)
}