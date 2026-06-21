const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/upload');
const upload = require('../middelware/uploadMiddleware');
const router  =  express.Router();



router.post("/" , upload.single('image'), uploadImage);

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: err.message,
            field: err.field,
            code: err.code
        });
    }

    next(err);
});

module.exports = router;
