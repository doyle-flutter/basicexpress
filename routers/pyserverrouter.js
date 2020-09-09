const express = require('express'), 
    router = express.Router(), 
    axios = require('axios').default;

// connect pyserver 
router.get('/',async (req,res) => {
    let pythonFlaskIp = 'http://jpy-bnrqw.run.goorm.io';
    try{
        let data = await axios.get(pythonFlaskIp);
        res.json(`Node.js -> Flask : ${data.data.toString()}`);
    }
    catch(e){
        res.json("Flask(Python) SERVER ERR")
    }
    
});

module.exports = router;