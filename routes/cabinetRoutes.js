const express = require('express');

const router = express.Router();

// get cabinet
router.get('/:n',(req,res,next)=>{
    res.sendStatus(200);
})
module.exports = router;