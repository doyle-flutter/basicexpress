const express = require('express'),
    path = require('path'),
    multer  = require('multer'),
    storage = multer.diskStorage({
        destination: function(req, file ,callback){
            callback(null, path.resolve(__dirname , '../files'));
        },
        filename: function(req, file, callback){
            let customName = file.originalname;
            if( customName == undefined) customName = "none";
            callback(null, "file-" + Date.now() + customName);
        }
    }),
    vstorage = multer.diskStorage({
        destination: function(req, file ,callback){
            callback(null, path.resolve(__dirname , '../vfiles'));
        },
        filename: function(req, file, callback){
            let customName = file.originalname;
            if( customName == undefined) customName = "none";
            callback(null, "file-" + Date.now() + customName);
        }
    }),
    upload = multer({ 
        dest: 'files/', 
        // limits: { fileSize: 5 * 1024 * 1024 },
        storage:storage,
    }),
    vupload = multer({ 
        dest: 'vfiles/', 
        // limits: { fileSize: 5 * 1024 * 1024 },
        storage:vstorage,
        fileFilter: (req, file, cb) => {
            console.log(`file.mimetype : ${file.mimetype}`)
            // WEB : video/mp4
            // And && IOS : application/octet-stream
            let type = file.mimetype;
            if(type !== 'video/mp4' && type !== 'application/octet-stream' ){
                req.fileValidationError = 'typeErr';
                return cb(null, false, new Error('goes wrong on the mimetype'));
            }
            return cb(null, true)
        }
    }),
    router = express.Router();


// Route PATH : /fpage
router.get('/', (req,res) => res.sendFile(path.join(__dirname, '../views/fileview.html')));
// post
router.post('/send/img',upload.single('fimg'), (req,res) => {
    if(req.file == undefined){
        res.redirect('/fpage');
        return;
    }
    req.session.fileCheck = false;
    res.redirect('/fpage/success'); // token :
    return;
});
router.post('/send/images',upload.array("fimages"), (req,res) => {
    console.log(req.files);
    res.send('files');
})
router.get('/success', (req,res) => {
    if(req.session.fileCheck){
        res.redirect('/');
        return;
    }
    else{
        req.session.destroy();
        res.sendFile(path.join(__dirname, '../views/fileuploadsuccess.html'));
        return;
    }
})

router.get('/videos', (req,res) => {
    res.render('../views/videopug.pug');
});

router.post('/videos', (req,res) => {
    let upload = vupload.single('fv');
    upload(req,res,(err) => {
        console.log(req.fileValidationError);
        if(req.fileValidationError === 'typeErr') return res.send("File Type ERR ! Only V !");
        if(err) return res.send("ERR!");
        return res.send("V!");
    })
});

module.exports = router;