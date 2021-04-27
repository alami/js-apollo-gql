// 1. Требуется 'apollo-server'.
const { ApolloServer } = require('apollo-server')
const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
    type Mutation {
        postPhoto(name: String! description: String): Boolean!
    }
`
// 1. Тип данных для хранения ваших фотографий в памяти.
var photos = []
const resolvers = {
    Query: {
        totalPhotos: () => photos.length, // 2. Возвращаем длину массива фотографий.
    },
    // 3. Распознаватель Mutation и postPhoto.
    Mutation: {
        postPhoto(parent, args) {
            photos.push(args)
            return true
        }
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