import DatauriParser from 'datauri/parser';
import path from 'path';

const parser = new DatauriParser();

export const toDataUri = (file: Express.Multer.File) => {
    return parser.format(path.extname(file.originalname).toString(), file.buffer).content;
};
