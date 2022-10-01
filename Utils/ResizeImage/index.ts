import UploadImage from "../Cloudinary";
import { v2 as cloudinary } from 'cloudinary'
const fs = require('fs')
cloudinary.config({
    cloud_name: 'dzfaefnjk',
    api_key: '369999426879935',
    api_secret: 'ICdf-oUQFWl7lHMN7GJKScWc6D4',
    secure: true
});
const sharp = require('sharp');

const ResizeImage = async (img: { buffer: any, originalname: string }) => {
    const name = './tmp/resize/' + Math.round(Math.random() * 1E9) + img.originalname
    try {
        await sharp(img.buffer).resize({ fit: 'inside' })
            .rotate()
            .jpeg({ quality: 10 })
            .timeout({ seconds: 3 })
            .toFile(name)
        const upload = await cloudinary.uploader.upload(name)
        fs.unlinkSync(name)
        return upload
    } catch (error:any) {
        return error.toString()
    }
}
export default ResizeImage