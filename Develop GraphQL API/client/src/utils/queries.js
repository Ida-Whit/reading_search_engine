import { gql } from '@apollo/client';

//GET_ME

export const GET_ME = gql`
  query me {
    User {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;