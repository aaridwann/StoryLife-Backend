import { Response } from "express";
const bcrypt = require("bcrypt")

export const refreshToken = async (req: { cookies: string }, res: Response) => {
    console.log(req.cookies);
    // const decrypt = bcrypt
    return res.status(200).json(req.cookies)

}