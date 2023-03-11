const cabinets = [
    "empty",
    "empty",
    "empty"
]

const orders = {}
const order_queue = []

function genHexString(len) {
    const hex = '0123456789ABCDEF';
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}

function add_order(order){
    const key=genHexString(7)
    orders[key] = order
    order_queue.unshift(key)
    return key
}

function get_latest_order_id(){
    if(order_queue.length == 0){
        return
    }
    const id = order_queue[order_queue.length-1]
    return id
}

function finish_order(){
    order_queue.pop()
}

module.exports = {cabinets,orders,get_latest_order_id,finish_order}