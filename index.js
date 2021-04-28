const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')
const { GraphQLScalarType } = require('graphql')
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

const resolvers = require('./resolvers')
var app = express()
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({ app })  // 3. разрешить промежуточное ПО, смонтированное по тому же самому пути

app.get('/', (req, res) =>   // 4. Создаем домашний маршрут
    res.end('Welcome to the PhotoShare API'))

app.get('/playground', expressPlayground({ endpoint:'/graphql' }))

app.listen({ port: 4000 }, () =>  // 5. Перехватываем события на определенном порте.
    console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`)
)