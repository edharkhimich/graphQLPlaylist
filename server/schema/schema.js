const graphql = require('graphql')
const _ = require('lodash')

//We take GraphQLObjectType from graphql
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql

var books = [
    {name: 'Name of the Wind', genre: 'Fantazy', id: '1', authorId: '1'},
    {name: 'The final Empire', genre: 'Fantazy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'Hero Of Ages', genre: 'Fantazy', id: '4', authorId: '2'},
    {name: 'The Colour Of Magic', genre: 'Fantazy', id: '5', authorId: '3'},
    {name: 'The Light Magic', genre: 'Fantazy', id: '6', authorId: '3'},
]

var authors = [
    {name: 'Patrik Rothfuss', age: 44, id: '1', bookId: '1'},
    {name: 'Brandon Sanderson', age: 42, id: '2'},
    {name: 'Terry Pratchet', age: 66, id: '3'}
]



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve (parent, args){
                console.log(parent)
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList (BookType),
            resolve (parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})


const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve (parent, args) {
               return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve (parent, args){
                return _.find(authors, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})