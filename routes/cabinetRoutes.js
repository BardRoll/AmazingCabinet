const resources = require('../resources');
const express = require('express');

const router = express.Router();


// get cabinet
router.get('/',(req,res,next)=>{
    res.status(200).json({
        "status": "success",
        "cabinets" : resources.cabinets
    })
})

router.post('/:n',(req,res,next)=>{
    const cabinet_len = resources.cabinets.length
    // console.log(req.body)]]
    cabinet_status = req.body.cabinet_status
    if(!cabinet_status){
        return res.status(400).send({
            "status": "error",
            "message": "No cabinet_status provided"
        });
    }
    if(isNaN(req.params.n) || req.params.n < 0 || req.params.n >= cabinet_len){

        return res.status(400).send({
            "status":"error",
            "message": "Cabinet number must be 0 to "+cabinet_len-1
        })
    }
    resources.cabinets[req.params.n] = cabinet_status;
    return res.send({
        "status": "success"
    });
})

module.exports = router;