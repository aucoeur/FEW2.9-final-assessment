const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

const todos = [
  {
    name: "A todo item",
    completed: 1,
    date: new Date("1988-07-10T14:30:00.000Z").toDateString(),
    id: 1
  },
  {
    name: "An unfinished todo item",
    completed: 0,
    date: new Date("2020-01-01T14:30:00.000Z").toDateString(),
    id: 1
  }
]

let todoCount = todos.length

const resolvers = {
  Query: {
    getAllTodos: () => {
      return todos
    },
    getTodo: ({id}) => {
      return todos[id]
    },
    getCompletedTodos: () => {
      return todos.filter(t => {
        if (t.completed) {
          return t
        }
      })
    }
  },
  Mutation: {
    addTodo: (parent, args) => {
      const date = args.date || Date.now()
      const todo = {
        id: todoCount++,
        name: args.name,
        date: new Date(date).toDateString(),
        completed: 0
      }
      todos.push(todo)
      return todo
    },
    completeTodo: (parent, {id}) => {
      // toggles opposite boolean status of completed
      todos[id].completed = !todos[id].completed
      return todos[id]
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'), 'utf8'
  ),
  resolvers
})

server.listen()
  .then(({ url }) => {
    console.log(`Server is running on ${url}graphiql`)
  })
