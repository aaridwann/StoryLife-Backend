let img = './upload/img/avatar-1657524343627-331564421.jpg'
const folder = '1uzySTSQarm2A3b2MsPOELlzbs0SgAvmi'
const key = './avian-influence-355401-f5f2de1850f3.json'


export const googleUpload = async (image: any) => {
    const fs = require('fs');
    const { GoogleAuth } = require('google-auth-library')
    const { google } = require('googleapis')

    const auth = new google.auth.GoogleAuth({ keyFile: key, scopes: ['https://www.googleapis.com/auth/drive'] })
    const service = google.drive({ version: 'v3', auth })
    const fileMetaData = {
        'title': 'photo.jpeg',
        'parents': [folder]
    }
    const media = {
        mimeType: 'image/jpeg',
        // body: fs.createReadStream(img)
        body: fs.createReadStream(image)
    };

    try {
        const file = await service.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        })
        console.log('File Id:', file.data.id)
        // return file.data.id
    } catch (error) {
        console.log(error)
    }


}
// googleUpload()