const resources = require('../resources');
const express = require('express');

const router = express.Router();

router.post('/submit',(req,res,next)=>{
    const cabinet_len = resources.cabinets.length
    const order = req.body.order
    if(!order){
        return res.status(400).json({
            "status" : "error",
            "message": "No order provided"
        })
    }
    if(!typeof order === 'object' || Array.isArray(order)){
        return res.status(400).json({
            "status" : "error",
            "message": "Order is not an object"
        })
    }
    for(const i in order){
        if(isNaN(i)){
            return res.status(400).json({
                "status" : "error",
                "message": "Cabinet '"+i+"' in order is not a valid cabinet"
            })
        }
    }
    // resources.orders.push(order)
    const key= resources.add_order(order)
    res.status(200).json({
        "status": "success",
        "order": key
    })
})

router.post('/update/:n',(req,res,next)=>{
    // TODO
    if(req.params.n in resources.orders){
        return res.status(400).json({
            "status" : "error",
            "message": "Order does not exist"
        })
    }
    res.status(200).json({
        "status": "success",
    })
})

module.exports = router;