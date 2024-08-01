Please put the HTTP web service code in this folder.

## Step 1: Choose Node.js
Node.js has the http module to create a simple HTTP server 

## Step 2: Use a framework instead of the http module to implement the HTTP server
- Frameworks provide more advanced abstractions and encapsulations, integrate common functional modules and middleware, have a more standardized and clear code structure, and provide a more complete error handling mechanism.
- If choosing http module, complicated underlying details need to be handled. 

## Step 3: Choose the Express framework
- The frameworks that can be selected for Node.js projects include: Express, Koa, NestJS, Fastify, Hapi.
- Because the Express framework is simple and easy to use, suitable for beginners, flexible, rich in resources, and suitable for handling small and simple tasks, it is a fast and lightweight framework for building web applications. 
- Therefore, the Express framework is chosen. 

## Local test tool
postman

## Debug process summary
### Bug1
Cannot read properties of undefined (reading 'taskName')
### Solution
Add a statement in code：`app.use(express.json())`

### Bug2
Task addition failed: `TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Task.`
### Solution
Convert parameter format of file processing method passed into the `fs` module. 

## Areas to be optimized
- Considering time, when implementing user authentication, I used the built-in encryption module of Node.js.
- Store the encrypted login password in the configuration file to avoid storing password with plain text in the code.
### Other methods
1. Replace the built-in encryption module with a more secure encryption algorithm 
2. Obtain from database
3. JWT 
4. Single sign-on 
5. OAuth 
6. Session 

## Refactoring and Optimization
- Firstly, after understanding ES6 modularization, the require method used at the beginning was changed to import method. 
- Secondly, after understanding the streaming processing, the originally adopted file synchronous reading method was changed to streaming processing. During the processing, asynchronous situations need to be handled.  

## Note
For the convenience to verify code function, the login password is recorded here, and the value is `mss_password`.