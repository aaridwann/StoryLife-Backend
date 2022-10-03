var path = require('path')
const multer = require('multer')



const maxSize = 2 * 1024 * 1024;
const filter = (req: any, file: { mimetype: string }, cb: any) => {
    const ext = file.mimetype
    if (ext == 'image/jpg' || ext == 'image/jpeg' || ext == 'image/png') {
        return cb(null, true)
    } else {
       cb(new Error('only .png .jpg or .jpeg files'), false)
    }
}
const errorHandler = (req:any,res:any,err:any) => {
    if(err) return res.status(300).json(err)
}
const storageMulter = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './tmp/my-uploads')
    },
    filename: function (req: string, file: any, cb: any) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

export const upload = multer({ storageMulter, fileFilter: filter,  limits: { fileSize: maxSize }, onError:errorHandler })
export const uploadSingle = upload.single("img")
export const uploadMultiple = upload.single("img")
