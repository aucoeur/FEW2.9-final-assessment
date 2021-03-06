# FEW 2.9 Final Assessment
Repo for FEW2.9 GraphQL Final

## GraphQL Queries
### get all todos
  ```graphql
  query getAll {
    getAllTodos {
        name
        date
        id
        completed
    }
  }
  ```

### Get All Completed Todos
```graphql
query getComplete {
  getCompletedTodos {
    name
    date
    completed
  }
}
```

### Add Todo
```gql
mutation addFinalTodo {
  addTodo(name: "Finish this final", date: "05-23-2021") {
    name
    date
  }
}
```

### Toggle completed status
```gql
mutation toggleComplete {
  completeTodo(id: 2) {
    name
    completed
  }
}
```

# Assessment Challenges
## Question 1 - Setup

Your goal is to build a GraphQL Todo application. For this assignment, you will build a server that supports your GraphQL schema. You will write the schema, resolvers, and some queries that test query types in your schema. 

# Todo GraphQL

Your goal is to make a GraphQL todo app. It should be able to:

- display a list of todos
- create new todos
- and mark a todo completed or not completed

## Challenges

### Create a Server

- [x] Setup a GraphQL server
- [x] Enable Graphiql

### Create a Schema 

Write a schema that defines the following types:

- [x] **Type Todo**
  - [x] name 
  - [x] completed
  - [x] date 
  - [x] id

- [x] **Query**
  - [x] getAllTodos, should return a list of todos
  - [x] getTodo, should return a single todo
  - [x] getCompletedTodos, returns a list of completed todos
  	- Stretch: can return completed or not completed todos

- [x] **Mutation**
  - [x] addTodo, creates a new todo, and returns that todo
  - [x] completeTodo, marks a todo complete and returns that todo

### Write a GraphQL Queries

Write queries to perform the following operations. 

**Test these in Graphiql and paste them into a readme in your project folder.** If I launch your project I should be able to test all of your queries. 

- [x] List all todos
- [x] Add a new todo: name: "Complete the final assessment"
- [x] Show the: "Completed final assessment" todo 
- [x] Complete the: "Complete final assessment" todo
- [x] Show all completed todos
  - STRETCH: Show all not completed todos

### Stretch Challenge: Subscriptions

Add subscriptions to your work. We need a subscriptions to tell us when a new todo is created and when a todo is completed.

**Schema**

**Subscription**
- newTodo => todo
- todoCompleted => todo

**Resolver**

Write a resolver to handle the two new query types.

**Query**

Write a query for each of the subscription types above. 

#### Stretch Challenge: Enum

Add an enum to prioritize your todos. 

**Schema**

- Define an enum with: High, Normal, and Low 
- Add a priority field to your Todo type
- Add a setPriority mutation
- Add a query to sort by priority

**Resolver**

Handle the new query types in your schema. You'll need to also update your data source. 

**Query**

Test the following queries and add them to your readme:  

- Display the priority when you list todos
- Set the "Complete final assessment" todo to "High" priority
- Sort todos by priority

## Submit your work 

Submit your completed work on GradeScope.
