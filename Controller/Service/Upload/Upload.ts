import { Response } from "express";
import ResizeImage from "../../../Utils/ResizeImage";
import { userDb } from "../../../Models/UsersModels";

const UploadTest = async (req: any, res: Response) => {
    const resize = await ResizeImage(req.file)
    if (!resize) return res.status(300).json(resize)
    try {
        console.log(req.user._id);
        const response = await userDb.updateOne({ _id: req.user._id }, { $set: { avatar: resize.secure_url } })
        if (response.modifiedCount) return res.status(201).json({ state: true, response: response, message: 'Avatar has been set', data: resize, })
    } catch (error) {
        return res.status(403).json({ state: false, message: error })
    }

}

export default UploadTest