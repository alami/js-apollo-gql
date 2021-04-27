// 1. Требуется 'apollo-server'.
const { ApolloServer } = require('apollo-server')
const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
`
const resolvers = {
    Query: {
        totalPhotos: () => 42
    }
}
// 2. Создаем новый экземпляр сервера.
// 3. Отправляем ему объект с typeDefs (схема) и resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers
})
// 4. Вызываем отслеживание на сервере для запуска веб-сервера.
server
    .listen()
    .then(({url}) => console.log(`GraphQL Service running on ${url}`))