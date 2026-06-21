// مسار الملف: middlewares/uploadMiddleware.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const newFileName = file.fieldname + '-' + uniqueSuffix + extension;
        cb(null, newFileName);
    }
});


const upload = multer({ storage: storage });

module.exports = upload;
