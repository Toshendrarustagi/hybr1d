# hybr1d


To run the API's

Requirements :-
1) Nodejs
2) Postman
3) Visual studio code

For postman >>>

----------------------------------------------------------------------------------------------------------------------------------------------
1)(POST) API for register -> http://localhost:8081/api/auth/register 

header - | key - content-type ||  value - application/json |

body -> example

        {
            "username":"XYZ",
            "password":"12345678", // (min length - 8)
            "isSeller": true       // if seller put true, else if buyer put false
        }
        
   
----------------------------------------------------------------------------------------------------------------------------------------------
2)(POST) API for login -> http://localhost:8081/api/auth/login 

header - | key - content-type ||  value - application/json |

body -> example

        {
            "username":"XYZ",
            "password":"12345678", // (min length - 8)
        }

----------------------------------------------------------------------------------------------------------------------------------------------
3)(POST) API for seller to create catalog -> http://localhost:8081/api/seller/create-catalog 

header - 1) | key - content-type ||  value - application/json |

         2) | x-auth-token  || value - protected route obtained from login api |
                               
                               (ex - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ODhjMDk0ZWY1NDAxMDA2Njk0ZDg3In0sImlhdCI6MTY1MzEyMTY2NCwiZXhwIjoxNjUzOTg1NjY0fQ._Xm40vb3ntyhMbPm-EZs4E2JO6RgoLXnfVfKQ_W5D4k)
                                        
body -> example

        [
            {
                "productName":"tomato",
                "productPrice": 90,
                "productQuantity": 10
            },
            {
                "productName":"onion",
                "productPrice": 78,
                "productQuantity": 10
            },
            {
                "productName":"grape",
                "productPrice": 90,
                "productQuantity": 10
            }
        ]

----------------------------------------------------------------------------------------------------------------------------------------------
4)(GET) API for seller to view orders -> http://localhost:8081/api/seller/orders 

header -    | x-auth-token  || value - protected route obtained from login api |
                               
                               (ex - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ODhjMDk0ZWY1NDAxMDA2Njk0ZDg3In0sImlhdCI6MTY1MzEyMTY2NCwiZXhwIjoxNjUzOTg1NjY0fQ._Xm40vb3ntyhMbPm-EZs4E2JO6RgoLXnfVfKQ_W5D4k)
                                        
(No body)

----------------------------------------------------------------------------------------------------------------------------------------------
5)(GET) Api for buyer to view list of sellers -> http://localhost:8081/api/buyer/list-of-sellers 

No - header

No - Body

----------------------------------------------------------------------------------------------------------------------------------------------
6)(GET) API for buyer to view catalog using seller id -> http://localhost:8081/api/buyer/seller-catalog/62888c094ef5401006694d87 (example) (_id in user is seller id with isSeller = true)

No - header

No - Body

----------------------------------------------------------------------------------------------------------------------------------------------
7)(POST) API for buyer to create order using seller id -> http://localhost:8081/api/buyer/create-order/62888c094ef5401006694d87 (example) 

header - 1) | key - content-type ||  value - application/json |

         2) | x-auth-token  || value - protected route obtained from login api |
                               
                               (ex - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ODhjMDk0ZWY1NDAxMDA2Njk0ZDg3In0sImlhdCI6MTY1MzEyMTY2NCwiZXhwIjoxNjUzOTg1NjY0fQ._Xm40vb3ntyhMbPm-EZs4E2JO6RgoLXnfVfKQ_W5D4k)
                                        
body - example

       [
          {
              "productName" : "tomato",
              "productQuantity": 3
          },
          {
              "productName" : "grape",
              "productQuantity": 8
          }
        ]
----------------------------------------------------------------------------------------------------------------------------------------------
