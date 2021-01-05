
# API

## Installation & Quick Start
- Clone the repository.
```shell
git clone https://github.com/nishoo-09/product_management
```
- Install project dependencies.
```shell
cd  product_management
npm install
```
- Make a configuration file similar to `config.js`.
## User Api
### User Create API
This api is use for the create user.
#### POST:  https://rw-product-api.herokuapp.com/user/create
Body content:

| Parameter | Required | Type | Description|
| ---- | ---- | ---- | ---- |
| profilePic | Yes | string | Upload user profile pic|
| name | Yes | string |User Name|
| email | Yes | string |User email id|
| bio | Yes | string |User bio data|

*  Input

```
    {
        "profilePic": "test.jpg",
        "name":"test",
        "email":"test@gmail.com",
        "bio":"software engineer" 
    }
```

* API Response - 
* success

```
    {
        "message": "User successfully created",
        "results": {
            "_id": "5ff43589565bf90017e619f8",
            "name": "test",
            "email": "test@gmail.com",
            "bio": "software engineer",
            "profilePic": {
                "url": "uploads/profilePic-1609840009494.jpg",
                "contentType": "image/png"
            },
        "__v": 0
    }
```

* Success code - `200`
* Error codes -
    * `400` - Missing parameters
    * `401` - Internal Server Error

### User list API
#### GET:  https://rw-product-api.herokuapp.com/user/lists
Reuired Parameter : No parameter required

* API Response - 
* success

```
    {
       "message": "success",
        "results": [
            {
                "profilePic": {
                    "url": "uploads/profilePic-1609821041624.jpg",
                    "contentType": "image/png"
                },
                "_id": "5ff3eb71d3f28713c440dccd",
                "name": "nishoo",
                "email": "test3@gmail.com",
                "bio": "test",
                "__v": 0
            },
            {
                "profilePic": {
                    "url": "uploads/profilePic-1609822597380.png",
                    "contentType": "image/png"
                },
                "_id": "5ff3f1856bc02119d0d9ce01",
                "name": "nishoo",
                "email": "test4@gmail.com",
                "bio": "test",
                "__v": 0
            },
        ]
    }
```

* Success code - `200`
* Error codes -
    * `401` - Internal Server Error

## Business API
### Business Create API
User can create multiple business using this api
#### POST:  https://rw-product-api.herokuapp.com/business/create
Body content:

| Parameter | Required | Type | Description|
| ---- | ---- | ---- | ---- |
| name | Yes | string |Business Name|
| email | Yes | string |User email id|
| userId | Yes | string |user id|
| registrationNo | Yes | Number | Registration number|

*  Input

```
    {
        "name": "b1",
        "email":"test@gmail.com",
        "registrationNo":123,
        "userId":"5ff3eb71d3f28713c440dccd"
    }
```

* API Response - 
* success

```
    {
        "message": "Business successfully created",
        "results": {
            "_id": "5ff43651565bf90017e619fc",
            "name": "b4",
            "email": "test3@gmail.com",
            "registrationNo": "3",
            "user": "5ff3eb71d3f28713c440dccd",
            "__v": 0
        }
    }
```

* Success code - `200`
* Error codes -
    * `400` - Missing parameters
    * `401` - Internal Server Error

### User list API
#### GET:  https://rw-product-api.herokuapp.com/business/lists
Reuired Parameter : No parameter required

* API Response - 
* success

```
    {
       "message": "success",
        "results": [
            {
                "_id": "5ff435c6565bf90017e619f9",
                "name": "b2",
                "email": "test@gmail.com",
                "registrationNo": "125",
                "user": {
                    "profilePic": {
                        "url": "uploads/profilePic-1609822791335.jpg",
                        "contentType": "image/png"
                    },
                    "_id": "5ff3f247c5b4b81a38e510f5",
                    "name": "nishoo",
                    "email": "test0@gmail.com",
                    "bio": "test",
                    "__v": 0
                },
                "__v": 0
            },
            {
                "_id": "5ff435e6565bf90017e619fa",
                "name": "b1",
                "email": "test@gmail.com",
                "registrationNo": "1",
                "user": {
                    "profilePic": {
                        "url": "uploads/profilePic-1609822791335.jpg",
                        "contentType": "image/png"
                    },
                    "_id": "5ff3f247c5b4b81a38e510f5",
                    "name": "nishoo",
                    "email": "test0@gmail.com",
                    "bio": "test",
                    "__v": 0
                },
                "__v": 0
            },
        ]
    }
```

* Success code - `200`
* Error codes -
    * `401` - Internal Server Error

## Product API
### Product Create API
User can post product as an individual or through his business 
#### POST:  https://rw-product-api.herokuapp.com/product/create
Body content:

| Parameter | Required | Type | Description|
| ---- | ---- | ---- | ---- |
| name | Yes | string |Product Name|
| mrp | Yes | Number |Maximum retail price of product|
| description | Yes | string |Product description|
| userId | No | String | User Id|
| businessId | No | String | Business Id|
| image | Yes | String |Product image|

Note : In userId or businessId only one(any) field is required 

*  Input

```
    {
        "name": "p1",
        "mrp":1000,
        "description":"nice product",
        "userId":"5ff3eb71d3f28713c440dccd"
        "image" : 'product1.jpg'
    }
```

* API Response - 
* success

```
    {
        "message": "Product successfully created",
        "results": {
            "_id": "5ff4375b565bf90017e61a00",
            "name": "p4",
            "mrp": "200",
            "description": "nice product",
            "image": {
                "url": "productImg/image-1609840474971.png",
                "contentType": "image/png"
            },
            "user": "5ff3f247c5b4b81a38e510f5",
            "__v": 0
        }
    }
```

* Success code - `200`
* Error codes -
    * `400` - Missing parameters
    * `401` - Internal Server Error

### User list API
#### GET:  https://rw-product-api.herokuapp.com/product/lists
Reuired Parameter : No parameter required

* API Response - 
* success

```
    {
       "message": "success",
        "results": [
            {
                "image": {
                    "url": "productImg/image-1609840437200.png",
                    "contentType": "image/png"
                },
                "_id": "5ff43735565bf90017e619fe",
                "name": "p2",
                "mrp": "200",
                "description": "good product feature",
                "business": {
                    "_id": "5ff435c6565bf90017e619f9",
                    "name": "b2",
                    "email": "test@gmail.com",
                    "registrationNo": "125",
                    "user": "5ff3f247c5b4b81a38e510f5",
                    "__v": 0
                },
                "__v": 0
            },
             {
                "image": {
                    "url": "productImg/image-1609840460984.png",
                    "contentType": "image/png"
                },
                "_id": "5ff4374d565bf90017e619ff",
                "name": "p2",
                "mrp": "200",
                "description": "good product feature",
                "user": {
                    "profilePic": {
                        "url": "uploads/profilePic-1609822791335.jpg",
                        "contentType": "image/png"
                    },
                    "_id": "5ff3f247c5b4b81a38e510f5",
                    "name": "nishoo",
                    "email": "test0@gmail.com",
                    "bio": "test",
                    "__v": 0
                },
                "__v": 0
            }
        ]
    }
```

* Success code - `200`
* Error codes -
    * `401` - Internal Server Error

## Product API
### Product Create API
User can update the created post.
#### POST:  https://rw-product-api.herokuapp.com/product/update
Body content:

| Parameter | Required | Type | Description|
| ---- | ---- | ---- | ---- |
| productId | Yes | string |Product Id|
| name | Yes | string |Product Name|
| mrp | Yes | Number |Maximum retail price of product|
| description | Yes | string |Product description|
| productImage | Yes | String |Product image|

*  Input

```
    {
        "productId":"5ff43735565bf90017e619fe"
        "name": "p1",
        "mrp":100,
        "description":"nice product",
        "productImage" : 'product1.jpg'
    }
```

* API Response - 
* success

```
    {
         "message": " 1 rows successfully updated"
    }
```
if record is not matched in table the it will show message
```
    {
         "message": " Record not found "
    }
```
* Success code - `200`
* Error codes -
    * `400` - Missing parameters
    * `401` - Internal Server Error

### User list API
#### GET:  https://rw-product-api.herokuapp.com/product/delete
Reuired Parameter : "id" : "5ff436e8565bf90017e619fd" (Product Id)

* API Response - 
* success

```
    {
      "message": "1 rows successfully deleted"
    }
```
if record is not matched in table the it will show message
```
    {
         "message": " Record not found "
    }
```

* Success code - `200`
* Error codes -
    * `400` - Missing parameter
    * `401` - Internal Server Error