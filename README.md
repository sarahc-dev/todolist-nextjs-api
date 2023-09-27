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
mkdir todolist
git clone <url> frontend
cd frontend
npm install

# Install and run the Express backend
cd ..
git clone https://github.com/sarahc-dev/todolist-collection.git api
cd api
npm install

# Run the test server in a new terminal
npm run start:test
```
