import multer from 'multer';
import { ulid } from 'ulid';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'temp_uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${ulid()}.${file.originalname.split('.').pop()}`);
	},
});

// export const upload = multer({
// 	storage,
// 	fileFilter: (_req, file, cb) => {
// 		const [fileType, _fileSubtype] = file.mimetype.split('/');

// 		if (fileType === 'image') {
// 			cb(null, true);
// 		} else {
// 			// cb(new Error('File format not supported'), false);
// 		}
// 	},
// });

const DEFAULT_UPLOAD_PATH = 'temp_uploads';

const createStorage = (folderPath) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${ulid()}.${file.originalname.split('.').pop()}`);
    },
});


export const createUpload = (folderPath = DEFAULT_UPLOAD_PATH) => multer({
    storage: createStorage(folderPath),
    fileFilter: (_req, file, cb) => {
        const [fileType, _fileSubtype] = file.mimetype.split('/');

        if (fileType === 'image') {
            cb(null, true);
        } else {
            cb(new Error('File format not supported'), false);
        }
    },
});

// Default export for backward compatibility
export const upload = createUpload();
