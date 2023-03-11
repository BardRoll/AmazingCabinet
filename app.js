const express = require("express")
const mqtt = require('mqtt')
const orderRoutes = require("./routes/orderRoutes");
const cabinetRoutes = require("./routes/cabinetRoutes");
const order_getRoutes = require("./routes/order_getRoutes");

// Express
const app = express();
app.use(express.json({ limit: "10MB" }));

// app.use('/order',orderRoutes);
// app.use('/order_get',order_getRoutes);
// app.use('/cabinet',cabinetRoutes);

app.get('/cabinet',(req,res)=>{
    return res.send(cabinetRoutes.get_cabinet());
})

// MQTT
const mqtt_routes = ['/cabinet','/test/number1']
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
    // console.log(req)
    switch(route){
        case '/cabinet':
            cabinetRoutes.post_cabinet(req)
            break;
        case '/order/send':

            break;
    }

})

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Listening on port "+port)
})