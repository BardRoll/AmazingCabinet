const express = require("express")
const mqtt = require('mqtt')
const orderRoutes = require("./routes/orderRoutes");
const cabinetRoutes = require("./routes/cabinetRoutes");
const order_getRoutes = require("./routes/order_getRoutes");

// Express
const app = express();
app.use(express.json({ limit: "10MB" }));

app.use('/order',orderRoutes);
// app.use('/order_get',order_getRoutes);
app.use('/cabinet',cabinetRoutes);

// MQTT
// const client = mqtt.connect('mqtt://broker.emqx.io',[{port:1883}])
const client = mqtt.connect('mqtt://broker.emqx.io:1883')

client.on('connect',function(){
    client.subscribe(['/test/number1'], function (err) {
        if (err) {
            console.log(err);
        }
    });
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic.toString())
    console.log(message.toString())
    // client.end()
})

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Listening on port "+port)
})