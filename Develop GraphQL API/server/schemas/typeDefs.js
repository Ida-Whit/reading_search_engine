const typesDefs = `
    type User {
       _id: ID!,
       username: String!,
       email: String,
       bookCount: Int,
       savedBooks: [Book]
    }

    type Book {
        bookId: ID!,
        authors: [String],
        description: String,
        title: String!,
        image: String,
        link: String
    }

    type Auth {
        token: ID!,
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, passwork: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String!], description: String!, title: String!, bookId: ID!, image: String, link: String): User
        removeBook(bookID: ID!):User
    }
`;

module.exports = typeDefs;