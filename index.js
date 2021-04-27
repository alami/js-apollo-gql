// 1. Требуется 'apollo-server'.
const { ApolloServer } = require('apollo-server')
const typeDefs = `
    # 1. Добавляем определение типа Photo.
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
    }
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]! # 2. Возвращаем Photo
    }
    # 3. Возвращаем недавно опубликованную фотографию из мутации.
    type Mutation {
        postPhoto(name: String! description: String): Photo!
    }
`
// 1. Переменная, которую мы будем увеличивать для уникальных идентификаторов.
var _id = 0
// 1. Тип данных для хранения ваших фотографий в памяти.
var photos = []
const resolvers = {
    Query: {
        totalPhotos: () => photos.length, // 2. Возвращаем длину массива фотографий.
        allPhotos: () => photos
    },
    // 3. Распознаватель Mutation и postPhoto.
    Mutation: {
        postPhoto(parent, args) {
            // 2. Создаем новую фотографию и генерируем идентификатор.
            var newPhoto = {
                id: _id++,
                ...args
            }
            photos.push(newPhoto)
            return newPhoto  // 3. Возвращаем новую фотографию.
        }
    },
    Photo: {
        url: parent => `http://yoursite.com/img/${parent.id}.jpg`
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