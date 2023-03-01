const express = require("express")
const orderRoutes = require("./routes/orderRoutes");
const cabinetRoutes = require("./routes/cabinetRoutes");
const order_getRoutes = require("./routes/order_getRoutes");

const app = express();

// app.use('/order',orderRoutes);
// app.use('/order_get',order_getRoutes);
app.use('/cabinet',cabinetRoutes);

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Listening on port "+port)
})