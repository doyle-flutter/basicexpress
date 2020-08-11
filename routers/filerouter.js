const express = require('express'),
    path = require('path'),
    multer  = require('multer'),
    fs = require('fs'),
    storage = multer.diskStorage({
        destination: function(req, file ,callback){
            callback(null, path.resolve(__dirname , '../files'));
        },
        filename: function(req, file, callback){
            callback(null, "file-" + Date.now() + file.originalname);
        }
    }),
    upload = multer({ 
        dest: 'files/', 
        // limits: { fileSize: 5 * 1024 * 1024 },
        storage:storage
    }),
    router = express.Router();


// Route PATH : /fpage
router.get('/', (req,res) => res.sendFile(path.join(__dirname, '../views/fileview.html')));
// post
router.post('/send/img',upload.single('fimg'), (req,res) => {
    if(req.file == undefined) res.redirect('/fpage');
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


module.exports = router;