const resources = require('../resources');


function get_cabinet(){
    return {
        "status" : "success",
        "cabinets": resources.cabinets
    }
}

function post_cabinet(req){
    const cabinet_len = resources.cabinets.length
    cabinet_status = req.cabinet_status
    if(!cabinet_status){
        console.log("No Cabinet Status");
        return
    }
    if(isNaN(req.cabinet) || req.cabinet < 0 || req.cabinet >= cabinet_len){
        console.log("Cabinet not found")
        return
    }
    console.log(`Cabinet ${req.cabinet} updated to ${cabinet_status}`)
    resources.cabinets[req.cabinet] = cabinet_status;
}

module.exports = {get_cabinet,post_cabinet};