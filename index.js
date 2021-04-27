const { ApolloServer } = require('apollo-server')

const typeDefs = `
    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
    }
    input PostPhotoInput {
        name: String!
        description: String
        category: PhotoCategory=PORTRAIT
    }
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }
    
    type Mutation {
        postPhoto(name: String! description: String category: PhotoCategory!): Photo!
        postPhoto1(input: PostPhotoInput!): Photo!
    }
`
var _id = 0
var photos = []
const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },
    Mutation: {
        postPhoto(parent, args) {
            var newPhoto = {
                id: _id++,
                ...args
            }
            photos.push(newPhoto)
            return newPhoto
        },
        postPhoto1(parent, args) {
            var newPhoto = {
                id: _id++,
                ...args.input
            }
            photos.push(newPhoto)
            return newPhoto
        }
    },
    Photo: {
        url: parent => `http://yoursite.com/img/${parent.id}.jpg`
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers
})
// 4. Вызываем отслеживание на сервере для запуска веб-сервера.
server
    .listen()
    .then(({url}) => console.log(`GraphQL Service running on ${url}`))