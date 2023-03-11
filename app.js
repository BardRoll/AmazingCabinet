const express = require("express")
const mqtt = require('mqtt')
const orderRoutes = require("./routes/orderRoutes");
const cabinetRoutes = require("./routes/cabinetRoutes");

// Express
const app = express();
app.use(express.json({ limit: "10MB" }));

app.get('/cabinet',(req,res)=>{
    return res.send(cabinetRoutes.get_cabinet());
})

app.get('/order',(req,res)=>{
    return res.send(orderRoutes.order());
})

app.post('/order/submit',(req,res)=>{
    return res.send(
        orderRoutes.order_submit({
            "order" : req.body.order
        })
    );
})

// MQTT
const mqtt_routes = ['/cabinet','/order/send','/order/update']
const client = mqtt.connect('mqtt://broker.emqx.io:1883')

client.on('connect',function(){
    client.subscribe(mqtt_routes, function (err) {
        if (err) {
            console.log(err);
        }
    });
})

client.on('message', function (topic, message) {
    const route = topic.toString();
    const req = JSON.parse(message.toString());
    console.log(route,req)
    switch(route){
        case '/cabinet':
            cabinetRoutes.post_cabinet(req)
            break;
        case '/order/send':
            orderRoutes.order_send(req)
            break;
        case '/order/update':
            orderRoutes.order_update(req)
            break;
    }
})

setInterval(()=>{
    client.publish('/order/get',JSON.stringify(orderRoutes.order_get()))
},1000)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Listening on port "+port)
})