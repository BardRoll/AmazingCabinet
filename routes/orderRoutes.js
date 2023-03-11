const resources = require('../resources');
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
    const id = resources.get_latest_order_id();
    if(!id){
        console.log("No latest order")
        return
    }
    const order = resources.orders[id] || {}
    const res = {};
    res["order_id"] = id
    for(const i in order){
        res["order_"+i] = order[i];
    }
    return res
}

function order_send(req){
    const id = resources.get_latest_order_id;
    if(!id){
        console.log("No latest order")
        return
    }
    const cabinet = req.cabinet;
    const order = resources.order[id]
    order[cabinet] = req.count;
    console.log(`Order updated cabinet ${cabinet} with count ${count}`)
    for(const i in order){
        if(i !=0 ){
            return
        }
    }
    console.log(`Order ${id} completed`)
    resources.finish_order()
}

function order_update(req){

}

module.exports = { order_submit, order_get, order_send, order_update};