const express = require('express'),
    router = express.Router();

router.get('/', (req,res) => {
    return res.render('../views/renderpug.pug', { "title" : "Contents TITLE" } );
});

router.get('/:index', (req,res) => {
    let index = req.params.index;
    let data = [
        1,2,3,4,5
    ]; 
    return res.render('../views/pathpub.pug', { "index" : index, "data":data } );
});


module.exports = router;
