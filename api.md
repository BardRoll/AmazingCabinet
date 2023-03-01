Required
========

## GET /cabinet
Frontend get cabinet list
Returns
```js
    {
        "status": "success",
        "num_cabinets" : 2
    }
```

## GET /cabinet/{n}
Frontend gets status of 1 cabinet (n)
Expects
    n: cabinet number, starts at 0
Returns
```js
    {
        "status" : "success",
        "cabinet_status" : "full"
    }
```
cabinetStatus: full, half, low, empty

## POST /cabinet/{n}
ESP sends status of cabinet
Expects
    n: cabinet number, starts at 0
```js
    {
        "status" : "success",
        "cabinet_status" : "full"
    }
```
cabinetStatus: full, half, low, empty

## GET /order_get/{n}
ESP polls new order 
Expects
    n: cabinet number, starts at 0
```js
    {
        "status" : "success",
        "count" : 2
    }
```
count is number of items need to send


## POST /order_get/{n}
ESP sends update to order
Expects
    n: cabinet number, starts at 0
```js
    {
        "status" : "success",
        "count" : 1
    }
```
count is number of items left

## POST /order/update
ESP32 updates orders when items go through chute
Expects
```js
    {
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