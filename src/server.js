const { ApolloServer, PubSub } = require('apollo-server')
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

const pubsub = new PubSub();

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
    addTodo: (_, args) => {

      const date = args.date ? new Date(args.date) : Date.now()

      const todo = {
        id: todoCount++,
        name: args.name,
        date: date.toDateString(),
        completed: 0
      }

      todos.push(todo)
      // publish subscription
      pubsub.publish('NEW_TODO', { newTodo: todo })

      return todo
    },
    completeTodo: (_, {id}) => {
      // toggles opposite boolean status of completed
      todos[id].completed = !todos[id].completed

      // publish subscription
      pubsub.publish('COMPLETED_TODO', { todoCompleted: todos[id] })
      return todos[id]
    }
  },
  Subscription: {
    newTodo: {
      subscribe: () => pubsub.asyncIterator('NEW_TODO') },
    todoCompleted: {
      subscribe: () => pubsub.asyncIterator('COMPLETED_TODO') },
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
