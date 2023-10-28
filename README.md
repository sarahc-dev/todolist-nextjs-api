# Todolist Next.js API routes

I have cloned the [todolist frontend](https://github.com/sarahc-dev/todolist-frontend-nextjs) project to try out using Next.js API routes.

I copied over the model and database connection from my express API. In a serverless world, there is no persistent server and therefore no persistent database connection. So each API route has to first connect to the database. I have added a check to check if there is a connection, and if not to connect to the database. I was also getting a 'Cannot overwrite `Todo` model once compiled.' error which I have resolved by amending the return statement to only create the model if one does not exist.

I have also copied the routes into the file structure required by Next.js and made the other necessary adjustments such as the return statements.

I have confirmed that all of my e2e tests are still passing.

I looked against at unit testing the controller, but with the structure of connecting to the database inside the function, I am not sure if it is possible to mock this.
