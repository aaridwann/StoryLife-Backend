import { Response } from "express";

const key = './avian-influence-355401-f5f2de1850f3.json'

interface Request {
    query: {
        id: string
    }
}

export const downloadFile = async (req: Request, res: Response) => {
    const { GoogleAuth } = require('google-auth-library');
    const { google } = require('googleapis');

    const auth = new GoogleAuth({ keyFile: key, scopes: 'https://www.googleapis.com/auth/drive' });
    const service = google.drive({ version: 'v3', auth });

    const fileId = req.query.id;
    try {
        const file = await service.files.get(
            { fileId: fileId, alt: 'media' },
            {responseType: 'arraybuffer'},
        );
        // const bfr = Buffer.from(file.data._readableState.buffer).toString()
        console.log(file)
        return res.send(file);
    } catch (err) {
        return res.send(err)
    }
};