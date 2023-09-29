# Todolist frontend

I want to make a simple full-stack CRUD app so that I can focus on TDD, process and understanding. In the future, I will different versions of this same basic app when learning and practicing new technologies on either frontend or backend.

See [https://github.com/sarahc-dev/todolist-collection](https://github.com/sarahc-dev/todolist-collection) for a description of the app, my original planning and wireframes.

For this version of the frontend, I am using:

- Next.js (React)
- TypeScript
- TailwindCSS
- Cypress - E2E and component testing

## Setup

```bash
# Set up folder to test full app
mkdir todolist
cd todolist

git clone <url> frontend
cd frontend
npm install
```

Test frontend components by running either:

```bash
# Select Component Testing in browser window
npm run cypress:open

# or
npx cypress run --component
```

To setup the full-stack app:

```bash
# Install and run the Express backend
cd ..
git clone https://github.com/sarahc-dev/todolist-collection.git api
cd api
npm install

# Run the test server in a new terminal
npm run start:test
```

To run e2e tests:

```bash
# In a terminal run frontend server
cd frontend
npm run dev

# In new terminal run tests
npm run cypress:open
# or
npx cypress run --e2e
```

## API

In order for this frontend to function correctly, the backend API must respond to the following requests:

### Get all todos

GET [http://localhost:8080/api/todos](http://localhost:8080/api/todos)  
Response:

```plain
[{
    _id: "1",
    title: "todo",
    completed: false
}, {
    _id: "2",
    title: "another todo",
    completed: false
}]
```

### Add todo

POST [http://localhost:8080/api/todos](http://localhost:8080/api/todos)  
Request Body: { title: "todo" }  
Response:

```plain
{
    _id: "1",
    title: "Added todo",
    completed: false
}
```

### Edit todo

PATCH [http://localhost:8080/api/todos/{id}](http://localhost:8080/api/todos/{id})  
Request Body: { key: value } to update

### Delete todo

DELETE [http://localhost:8080/api/todos/{id}](http://localhost:8080/api/todos/{id})
