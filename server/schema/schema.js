const graphql = require('graphql')
const _ = require('lodash')

//We take GraphQLObjectType from graphql
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

var books = [
    {name: 'Name of the Wind', genre: 'Fantazy', id: '1'},
    {name: 'The final Empire', genre: 'Fantazy', id: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})


const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        book: {
            type: 'BookType',
            args: {id: {GraphQLString}},
            resolve (parent, args) {
               return _.find(books, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})