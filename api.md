Required
========

## GET /cabinet
Frontend get cabinet list
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
cabinetStatus: full, half, low, empty

## POST /cabinet/
ESP sends status of cabinet
Expects
```js
    {
        "cabinet" : 1
        "cabinet_status" : "full"
    }
```
cabinet number, starts at 0
cabinetStatus: full, half, low, empty

## GET /order_get
ESP polls new order 
Expects
```js
    {
        "cabinet": 1
        "status" : "success",
        "count" : 2
    }
```
cabinet number, starts at 0
count is number of items need to send


## POST /order_get
ESP sends update to order
Expects
```js
    {
        "cabinet" : 1,
        "status" : "success",
        "count" : 1
    }
```
cabinet number, starts at 0
count is number of items left

## POST /order/update/
ESP32 updates orders when items go through slope
Expects
```js
    {
        "order": 1,
        "count" : 1
    }
```
count is number of new items through chute from last POST

## POST /order/submit
Frontend Sends server medicine order
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
        "order" : "id"
    }
```
order is medicine order, cabinet number : count
id is the order id

## 

Optional
========
## GET /order/{id}