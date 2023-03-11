const resources = require('../resources');
// const express = require('express');

// const router = express.Router();

function order_submit(req){
    const cabinet_len = resources.cabinets.length
    const order = req.order
    if(!order){
        return {
            "status" : "error",
            "message": "No order provided"
        }
    }
    if(!typeof order === 'object' || Array.isArray(order)){
        return {
            "status" : "error",
            "message": "Order is not an object"
        }
    }
    for(const i in order){
        if(isNaN(i)){
            return {
                "status" : "error",
                "message": "Cabinet '"+i+"' in order is not a valid cabinet"
            }
        }
    }
    // resources.orders.push(order)
    const key= resources.add_order(order)
    return {
        "status": "success",
        "order": key
    }
}

function order_get(){
    const id = resources.get_latest_order_id;
    const order = resources.orders[id] || {}
    return {
        "order_id" : id,
        "order" : order
    }
}

function order_send(req){
    const id = resources.get_latest_order_id;
    const cabinet = req.cabinet;
    console.log(`Order updated cabinet ${cabinet} with count ${count}`)
    resources.order[id][cabinet] = req.count;
}

function order_update(req){

}

module.exports = { order_submit, order_get, order_send, order_update};