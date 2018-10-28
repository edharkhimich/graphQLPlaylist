const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://shaun:dady6845107@ds155651.mlab.com:55651/gql-ninja')

mongoose.connection.once('open', () => {
    console.log('Connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log('Now listening for requests')
})

