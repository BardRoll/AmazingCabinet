Frontend
========

## GET /cabinet
> Frontend get cabinet list
Returns
```js
    {
        "status": "success",
        "cabinets" : [
            "full"
            "empty"
        ]
    }
```
- cabinetStatus: full, half, low, empty

## POST /order/submit
> Frontend Sends server medicine order
Expects
```js
    {
        "order" : {
            "1" : 2,
            "2" : 3,
            "3" : 4
        }
    }
```
Returns
```js
    {
        "status" : "success"
        "order_id" : "id"
    }
```
- order is medicine order, cabinet number : count
- id is the order id

For MQTT
========

## /cabinet
> ESP sends status of cabinet every few seconds
Expects
```js
    {
        "cabinet" : 1
        "cabinet_status" : "full"
    }
```
- cabinet number, starts at 0
- cabinetStatus: full, half, low, empty

## /order/get
> Server sends latest order status every few seconds
Returns
```js
    {
        "order_id" : "id",
        "order_1" : 1
        "order_2" : 3
        ...
        "order_n" : 5
    }
```
- order is medicine order, cabinet number : count
- count is number of items need to send


## POST /order/send
> ESP sends update to order
Expects
```js
    {
        "cabinet" : 1,
        "count" : 1
    }
```
- cabinet number, starts at 0
- count is number of items left

## /order/update
> ESP32 updates orders when items go through slope
Expects
```js
    {
        "order": 1,
        "count" : 1
    }
```
- count is number of new items through chute from last POST

Optional
========
## GET /order/{id}