# ShopServer

ShopServer is server-side app offering comprehensive eCommerce APIs, enabling developers to seamlessly integrate, scale, and optimize online retail operations

## Installation

1. Clone the respository
```bash
 git clone https://github.com/Harshit-625/ShopServer
```

2. Navigate to the project directory:
```bash
 cd ShopServer
```

3. Install Dependencies
```bash
 npm install
```
## Usage

1. Setup the Environmental Variable
2. Start the Application 
```bash
 npm start 
```

## API Documentation

### API Endpoints for Products

#### 1. **Get All Products**

   - **Endpoint**: `GET /products`
   - **Description**: Retrieves a list of all products. Supports filtering by category via query parameters.
   - **Query Parameters**:
     - `categories`: Comma-separated list of category IDs to filter products.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the list of products.
       ```json
       {
         "success": true,
         "data": [
           {
             "_id": "productId1",
             "name": "Product Name",
             "description": "Product Description",
             "richDescription": "Detailed Product Description",
             "image": "http://example.com/public/upload/image-123456789.jpg",
             "images": ["http://example.com/public/upload/image1.jpg"],
             "brand": "Brand Name",
             "price": 100.00,
             "category": {
               "_id": "categoryId",
               "name": "Category Name"
             },
             "countInStock": 10,
             "rating": 4.5,
             "numReviews": 20,
             "isFeatured": true,
             "dateCreated": "2024-07-28T00:00:00.000Z"
           },
           ...
         ]
       }
       ```
     - **Failure**: `500 Internal Server Error` if there's an issue retrieving products.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 2. **Get Product by ID**

   - **Endpoint**: `GET /products/:productId`
   - **Description**: Retrieves a specific product by its unique ID.
   - **Parameters**:
     - `productId`: The unique identifier of the product to retrieve.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the product details.
       ```json
       {
         "success": true,
         "data": {
           "_id": "productId",
           "name": "Product Name",
           "description": "Product Description",
           "richDescription": "Detailed Product Description",
           "image": "http://example.com/public/upload/image-123456789.jpg",
           "images": ["http://example.com/public/upload/image1.jpg"],
           "brand": "Brand Name",
           "price": 100.00,
           "category": {
             "_id": "categoryId",
             "name": "Category Name"
           },
           "countInStock": 10,
           "rating": 4.5,
           "numReviews": 20,
           "isFeatured": true,
           "dateCreated": "2024-07-28T00:00:00.000Z"
         }
       }
       ```
     - **Failure**: `400 Bad Request` if the product is not found or `500 Internal Server Error` if there’s an issue.
       ```json
       {
         "success": false,
         "message": "Product doesn't exist"
       }
       ```

#### 3. **Get Product Count**

   - **Endpoint**: `GET /products/get/count`
   - **Description**: Retrieves the total count of products.
   - **Response**:
     - **Success**: `200 OK` with the product count.
       ```json
       {
         "success": true,
         "productCount": 100
       }
       ```
     - **Failure**: `500 Internal Server Error` if there's an issue retrieving the count.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 4. **Get Featured Products**

   - **Endpoint**: `GET /products/get/featured`
   - **Description**: Retrieves a list of products that are marked as featured.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the list of featured products.
       ```json
       {
         "success": true,
         "data": [
           {
             "_id": "productId1",
             "name": "Featured Product Name",
             "description": "Product Description",
             "richDescription": "Detailed Product Description",
             "image": "http://example.com/public/upload/image-123456789.jpg",
             "images": ["http://example.com/public/upload/image1.jpg"],
             "brand": "Brand Name",
             "price": 100.00,
             "category": {
               "_id": "categoryId",
               "name": "Category Name"
             },
             "countInStock": 10,
             "rating": 4.5,
             "numReviews": 20,
             "isFeatured": true,
             "dateCreated": "2024-07-28T00:00:00.000Z"
           },
           ...
         ]
       }
       ```
     - **Failure**: `500 Internal Server Error` if there's an issue retrieving featured products.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 5. **Add a New Product**

   - **Endpoint**: `POST /products`
   - **Description**: Adds a new product. Requires an image upload.
   - **Request Body**:
     ```json
     {
       "name": "Product Name",
       "description": "Product Description",
       "richDescription": "Detailed Product Description",
       "category": "categoryId",
       "brand": "Brand Name",
       "price": 100.00,
       "images": ["image1.jpg"],
       "countInStock": 10,
       "rating": 4.5,
       "numReviews": 20,
       "isFeatured": true,
       "dateCreated": "2024-07-28T00:00:00.000Z"
     }
     ```
   - **Response**:
     - **Success**: `201 Created` with a message indicating successful creation.
       ```json
       {
         "success": true,
         "message": "The product is created"
       }
       ```
     - **Failure**: `400 Bad Request` if there’s an issue with the request or `500 Internal Server Error` if there’s an issue creating the product.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 6. **Upload Gallery Images**

   - **Endpoint**: `PUT /products/gallery-image/:productId`
   - **Description**: Uploads additional images for a product.
   - **Parameters**:
     - `productId`: The unique identifier of the product to update.
   - **Request Body**: Form data containing images.
   - **Response**:
     - **Success**: `200 OK` with a message indicating successful update.
       ```json
       {
         "success": true,
         "message": "The Product was updated successfully",
         "product": {
           "_id": "productId",
           "images": ["http://example.com/public/upload/image1.jpg"]
         }
       }
       ```
     - **Failure**: `400 Bad Request` if the product is not found or `500 Internal Server Error` if there’s an issue.
       ```json
       {
         "success": false,
         "message": "The Product does not Exist"
       }
       ```

#### 7. **Update a Product**

   - **Endpoint**: `PUT /products/:productId`
   - **Description**: Updates the details of an existing product.
   - **Parameters**:
     - `productId`: The unique identifier of the product to update.
   - **Request Body**:
     ```json
     {
       "name": "Updated Product Name",
       "description": "Updated Product Description",
       "richDescription": "Updated Detailed Product Description",
       "image": "http://example.com/public/upload/image-123456789.jpg",
       "images": ["http://example.com/public/upload/image1.jpg"],
       "brand": "Updated Brand Name",
       "price": 120.00,
       "category": "categoryId",
       "countInStock": 15,
       "rating": 4.7,
       "numReviews": 25,
       "isFeatured": false,
       "dateCreated": "2024-07-28T00:00:00.000Z"
     }
     ```
   - **Response**:
     - **Success**: `200 OK` with a message indicating successful update.
       ```json
       {
         "success": true,
         "message": "Updated Successfully",
         "product": {
           "_id": "productId",
           "name": "Updated Product Name"
         }
       }
       ```
     - **Failure**: `400 Bad Request` if the product is not found or `500 Internal Server Error` if there’s an issue.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 8. **Delete a Product**

### **Request**

- **Method**: `DELETE`
- **URL**: `/api/products/:productId`
- **URL Params**:
  - `productId` (string): The ID of the product to delete.

### **Response**

- **Success Response**:
  - **Status Code**: `200 OK`
  - **Content**:
    ```json
    {
      "success": true,
      "message": "The Product is deleted"
    }
    ```

- **Error Response**:
  - **Status Code**: `404 Not Found`
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Product not Found"
    }
    ```
  - **Status Code**: `400 Bad Request`
  - **Content**:
    ```json
    {
      "success": false,
      "error": "<error details>"
    }
    ```

### Summary

These endpoints handle various operations related to product management, including retrieving, adding, updating, and deleting products. They also support features like image uploading and filtering products by category. Ensure you handle file uploads properly and validate inputs to prevent errors.Here's a description of the API endpoints for managing users based on the provided code:

---
### API Endpoints for Users

#### 1. **Get List of Users**

   - **Endpoint**: `GET /users`
   - **Description**: Retrieves a list of all users. The `passwordHash` field is excluded from the response.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the list of users.
       ```json
       {
         "success": true,
         "data": [
           {
             "_id": "userId1",
             "name": "User Name",
             "email": "user@example.com",
             "phone": "123-456-7890",
             "isAdmin": true,
             "street": "123 Main St",
             "apartment": "4B",
             "city": "City Name",
             "zip": "12345",
             "country": "Country Name"
           },
           ...
         ]
       }
       ```
     - **Failure**: `500 Internal Server Error` if there's an issue retrieving users.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 2. **Get a Particular User by ID**

   - **Endpoint**: `GET /users/:userId`
   - **Description**: Retrieves a specific user by their unique ID. The `passwordHash` field is excluded from the response.
   - **Parameters**:
     - `userId`: The unique identifier of the user to retrieve.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the user details.
       ```json
       {
         "success": true,
         "data": {
           "_id": "userId",
           "name": "User Name",
           "email": "user@example.com",
           "phone": "123-456-7890",
           "isAdmin": true,
           "street": "123 Main St",
           "apartment": "4B",
           "city": "City Name",
           "zip": "12345",
           "country": "Country Name"
         }
       }
       ```
     - **Failure**: `500 Internal Server Error` if the user is not found or `400 Bad Request` if there's an issue.
       ```json
       {
         "success": false,
         "message": "The user was not found"
       }
       ```

#### 3. **Add a New User**

   - **Endpoint**: `POST /users`
   - **Description**: Adds a new user to the system.
   - **Request Body**:
     ```json
     {
       "name": "User Name",
       "email": "user@example.com",
       "password": "userpassword",
       "phone": "123-456-7890",
       "isAdmin": false,
       "street": "123 Main St",
       "apartment": "4B",
       "city": "City Name",
       "zip": "12345",
       "country": "Country Name"
     }
     ```
   - **Response**:
     - **Success**: `201 Created` with a message indicating successful creation.
       ```json
       {
         "success": true,
         "message": "New User created"
       }
       ```
     - **Failure**: `500 Internal Server Error` if there's an issue creating the user.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 4. **Register a New User**

   - **Endpoint**: `POST /users/register`
   - **Description**: Registers a new user. Similar to the `POST /users` endpoint.
   - **Request Body**: Same as the `POST /users` endpoint.
   - **Response**:
     - **Success**: `201 Created` with a message indicating successful registration.
       ```json
       {
         "success": true,
         "message": "New User created"
       }
       ```
     - **Failure**: `500 Internal Server Error` if there's an issue registering the user.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 5. **Login User**

   - **Endpoint**: `POST /users/login`
   - **Description**: Authenticates a user and returns a JWT token if successful.
   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "userpassword"
     }
     ```
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the user email and JWT token.
       ```json
       {
         "email": "user@example.com",
         "token": "jwt-token"
       }
       ```
     - **Failure**: `400 Bad Request` if the credentials are incorrect or `500 Internal Server Error` if there's an issue.
       ```json
       {
         "success": false,
         "message": "password is wrong!"
       }
       ```

#### 6. **Get User Count**

   - **Endpoint**: `GET /users/get/count`
   - **Description**: Retrieves the total count of users.
   - **Response**:
     - **Success**: `200 OK` with the user count.
       ```json
       {
         "success": true,
         "userCount": 100
       }
       ```
     - **Failure**: `500 Internal Server Error` if there's an issue retrieving the count.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 7. **Delete a User**

   - **Endpoint**: `DELETE /users/:userId`
   - **Description**: Deletes a user by their unique ID.
   - **Parameters**:
     - `userId`: The unique identifier of the user to delete.
   - **Response**:
     - **Success**: `200 OK` if the user is successfully deleted.
       ```json
       {
         "success": true,
         "message": "The User is deleted"
       }
       ```
     - **Failure**: `404 Not Found` if the user does not exist or `400 Bad Request` if there’s an issue.
       ```json
       {
         "success": false,
         "message": "User not Found"
       }
       ```

### Summary

These endpoints handle various operations related to user management, including retrieving, adding, registering, logging in, and deleting users. They also support features like JWT authentication and counting users. Ensure that user passwords are securely hashed and that proper error handling is implemented to avoid exposing sensitive information.
### API Endpoints for Categories

#### 1. **Get All Categories**

   - **Endpoint**: `GET /categories`
   - **Description**: Retrieves a list of all categories from the database.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing an array of categories.
       ```json
       {
         "success": true,
         "data": [
           {
             "_id": "categoryId1",
             "name": "Category Name",
             "icon": "Icon URL",
             "color": "Color Code"
           },
           ...
         ]
       }
       ```
     - **Failure**: `500 Internal Server Error` if there’s an issue with fetching categories.
       ```json
       {
         "success": false
       }
       ```

#### 2. **Get a Particular Category**

   - **Endpoint**: `GET /categories/:categoryId`
   - **Description**: Retrieves a single category by its unique ID.
   - **Parameters**:
     - `categoryId`: The unique identifier of the category to retrieve.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the category details.
       ```json
       {
         "success": true,
         "data": {
           "_id": "categoryId",
           "name": "Category Name",
           "icon": "Icon URL",
           "color": "Color Code"
         }
       }
       ```
     - **Failure**: `400 Bad Request` if the category is not found or there’s an error retrieving it.
       ```json
       {
         "success": false,
         "message": "The category was not found",
         "error": "Error details"
       }
       ```

#### 3. **Add a New Category**

   - **Endpoint**: `POST /categories`
   - **Description**: Creates a new category and saves it to the database.
   - **Request Body**:
     ```json
     {
       "name": "Category Name",
       "icon": "Icon URL",
       "color": "Color Code"
     }
     ```
   - **Response**:
     - **Success**: `201 Created` with a message indicating successful creation.
       ```json
       {
         "success": true,
         "message": "The Category Name category is created"
       }
       ```
     - **Failure**: `500 Internal Server Error` if there’s an issue creating the category.
       ```json
       {
         "success": false,
         "error": "Error details"
       }
       ```

#### 4. **Update a Category**

   - **Endpoint**: `PUT /categories/:categoryId`
   - **Description**: Updates an existing category with new information.
   - **Parameters**:
     - `categoryId`: The unique identifier of the category to update.
   - **Request Body**:
     ```json
     {
       "name": "Updated Category Name",
       "icon": "Updated Icon URL",
       "color": "Updated Color Code"
     }
     ```
   - **Response**:
     - **Success**: `201 Created` if the category is updated successfully.
       ```json
       {
         "success": true,
         "message": "Updated Successfully"
       }
       ```
     - **Failure**: `500 Internal Server Error` if the category is not found or there’s an error updating it.
       ```json
       {
         "success": false,
         "message": "Category not Found",
         "error": "Error details"
       }
       ```

#### 5. **Delete a Category**

   - **Endpoint**: `DELETE /categories/:categoryId`
   - **Description**: Deletes a category by its unique ID.
   - **Parameters**:
     - `categoryId`: The unique identifier of the category to delete.
   - **Response**:
     - **Success**: `200 OK` if the category is successfully deleted.
       ```json
       {
         "success": true,
         "message": "The category is deleted"
       }
       ```
     - **Failure**: `404 Not Found` if the category does not exist or `400 Bad Request` if there’s an error.
       ```json
       {
         "success": false,
         "message": "Category not Found",
         "error": "Error details"
       }
       ```

### Summary

These endpoints cover basic CRUD (Create, Read, Update, Delete) operations for categories. Ensure that appropriate validation and error handling are implemented for a robust API.

---
### API Endpoints for Orders

#### 1. **Get All Orders**

   - **Endpoint**: `GET /orders`
   - **Description**: Retrieves a list of all orders from the database. Includes user information (name) for each order.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing an array of orders.
       ```json
       {
         "success": true,
         "orders": [
           {
             "_id": "orderId1",
             "orderItems": [/* OrderItem IDs */],
             "shippingAddress1": "Address Line 1",
             "shippingAddress2": "Address Line 2",
             "city": "City",
             "zip": "Zip Code",
             "country": "Country",
             "phone": "Phone Number",
             "status": "Order Status",
             "totalPrice": 100.00,
             "user": {
               "_id": "userId",
               "name": "User Name"
             }
           },
           ...
         ]
       }
       ```
     - **Failure**: `400 Bad Request` if no orders are found or if there’s an error.
       ```json
       {
         "success": false,
         "message": "No Order List found"
       }
       ```

#### 2. **Get Order by ID**

   - **Endpoint**: `GET /orders/:orderId`
   - **Description**: Retrieves a specific order by its unique ID. Includes details of order items and products with their respective categories.
   - **Parameters**:
     - `orderId`: The unique identifier of the order to retrieve.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the order details.
       ```json
       {
         "success": true,
         "order": {
           "_id": "orderId",
           "orderItems": [
             {
               "_id": "orderItemId",
               "quantity": 2,
               "product": {
                 "_id": "productId",
                 "price": 50.00,
                 "category": {
                   "_id": "categoryId",
                   "name": "Category Name"
                 }
               }
             },
             ...
           ],
           "shippingAddress1": "Address Line 1",
           "shippingAddress2": "Address Line 2",
           "city": "City",
           "zip": "Zip Code",
           "country": "Country",
           "phone": "Phone Number",
           "status": "Order Status",
           "totalPrice": 100.00,
           "user": {
             "_id": "userId",
             "name": "User Name"
           }
         }
       }
       ```
     - **Failure**: `400 Bad Request` if the order is not found or if there’s an error.
       ```json
       {
         "success": false,
         "message": "No order found with this ID"
       }
       ```

#### 3. **Get User's Orders**

   - **Endpoint**: `GET /orders/get/userorder/:userId`
   - **Description**: Retrieves a list of orders associated with a specific user.
   - **Parameters**:
     - `userId`: The unique identifier of the user whose orders are to be retrieved.
   - **Response**:
     - **Success**: `200 OK` with a JSON object containing the list of orders for the user.
       ```json
       {
         "success": true,
         "UserOrderList": [
           {
             "_id": "orderId",
             "orderItems": [/* OrderItem IDs */],
             "shippingAddress1": "Address Line 1",
             "shippingAddress2": "Address Line 2",
             "city": "City",
             "zip": "Zip Code",
             "country": "Country",
             "phone": "Phone Number",
             "status": "Order Status",
             "totalPrice": 100.00,
             "user": {
               "_id": "userId",
               "name": "User Name"
             }
           },
           ...
         ]
       }
       ```
     - **Failure**: `400 Bad Request` if no orders are found or if there’s an error.
       ```json
       {
         "success": false,
         "message": "User not Found"
       }
       ```

#### 4. **Create a New Order**

   - **Endpoint**: `POST /orders`
   - **Description**: Creates a new order with associated order items and calculates the total price.
   - **Request Body**:
     ```json
     {
       "orderItems": [
         {
           "quantity": 2,
           "product": "productId1"
         },
         ...
       ],
       "shippingAddress1": "Address Line 1",
       "shippingAddress2": "Address Line 2",
       "city": "City",
       "zip": "Zip Code",
       "country": "Country",
       "phone": "Phone Number",
       "status": "Order Status",
       "user": "userId"
     }
     ```
   - **Response**:
     - **Success**: `201 Created` with a message indicating successful creation.
       ```json
       {
         "success": true,
         "message": "Order created successfully"
       }
       ```
     - **Failure**: `500 Internal Server Error` if there’s an issue creating the order.
       ```json
       {
         "success": false,
         "message": "Order not Created"
       }
       ```

#### 5. **Update an Order**

   - **Endpoint**: `PUT /orders/:orderId`
   - **Description**: Updates the status of an existing order.
   - **Parameters**:
     - `orderId`: The unique identifier of the order to update.
   - **Request Body**:
     ```json
     {
       "status": "Updated Status"
     }
     ```
   - **Response**:
     - **Success**: `200 OK` if the order is updated successfully.
       ```json
       {
         "success": true,
         "message": "Order Updated Successfully"
       }
       ```
     - **Failure**: `404 Not Found` if the order is not found or `500 Internal Server Error` if there’s an issue.
       ```json
       {
         "success": false,
         "message": "Order not Found"
       }
       ```

#### 6. **Delete an Order**

   - **Endpoint**: `DELETE /orders/:orderId`
   - **Description**: Deletes an order by its unique ID and removes associated order items.
   - **Parameters**:
     - `orderId`: The unique identifier of the order to delete.
   - **Response**:
     - **Success**: `200 OK` if the order and associated order items are successfully deleted.
       ```json
       {
         "success": true,
         "message": "Order Deleted Successfully"
       }
       ```
     - **Failure**: `404 Not Found` if the order does not exist or `500 Internal Server Error` if there’s an issue.
       ```json
       {
         "success": false,
         "message": "Order not Found"
       }
       ```

#### 7. **Get Total Sales**

   - **Endpoint**: `GET /orders/get/totalsales`
   - **Description**: Retrieves the total sales amount by summing the `totalPrice` of all orders.
   - **Response**:
     - **Success**: `200 OK` with the total sales amount.
       ```json
       {
         "success": true,
         "totalSale": [
           {
             "_id": null,
             "totalsales": 1000.00
           }
         ]
       }
       ```
     - **Failure**: `400 Bad Request` if the total sales cannot be generated or `500 Internal Server Error` if there’s an issue.
       ```json
       {
         "success": false,
         "message": "The Order sales cannot be generated"
       }
       ```

#### 8. **Get Order Count**

   - **Endpoint**: `GET /orders/get/count`
   - **Description**: Retrieves the total number of orders.
   - **Response**:
     - **Success**: `200 OK` with the count of orders.
       ```json
       {
         "success": true,
         "OrderCount": 50
       }
       ```
     - **Failure**: `400 Bad Request` if the count cannot be generated or `500 Internal Server Error` if there’s an issue.
       ```json
       {
         "success": false,
         "message": "The Order count cannot be generated"
       }
       ```

### Summary

These endpoints cover various functionalities related to order management, including viewing orders, creating new orders, updating, deleting, and aggregating order data. Ensure that you have proper validation and error handling to manage different scenarios effectively.

---
## Environment Variables'
1. API_URL : The base URL for the API endpoints.
2. SECRET : A secret key used for various cryptographic operations such as signing JWT tokens or 
    hashing passwords.
3. PORT : The port number on which the server listens for incoming requests.
4. CONNECTION_STRING : The connection string used to connect to a database.

Certainly! Here’s a section you can include in your README.md for authentication:

---

## Authentication

### Overview

This API uses JSON Web Tokens (JWT) for authentication. The authentication process involves generating and validating tokens to secure access to endpoints.

### Authentication Flow

1. **Register a New User**: Create a new user with a hashed password.
   - **Endpoint**: `/api/users/register`
   - **Method**: `POST`
   - **Payload**:
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string",
       "phone": "string",
       "isAdmin": "boolean",
       "street": "string",
       "apartment": "string",
       "city": "string",
       "zip": "string",
       "country": "string"
     }
     ```

2. **Login**: Authenticate and receive a JWT token.
   - **Endpoint**: `/api/users/login`
   - **Method**: `POST`
   - **Payload**:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Success Response**:
     ```json
     {
       "email": "string",
       "token": "string"
     }
     ```

3. **Access Protected Routes**: Include the JWT token in the `Authorization` header to access protected endpoints.
   - **Header**: `Authorization: Bearer <token>`

### Environment Variables

- `SECRET`: The secret key used to sign the JWT tokens.

### Example

To access protected routes, include the token in your request header:

```http
GET /api/protected-endpoint
Authorization: Bearer <your-jwt-token>
```

### Notes

- Ensure the `SECRET` environment variable is set for JWT signing.
- Tokens expire after 1 day; re-authentication is required after expiration.

---