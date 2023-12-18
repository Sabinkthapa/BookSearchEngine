import {gql} from '@apollo/client';

export const LOGIN_USER =gql `
mutation login($email:String!, $password:String!){
    login(email:$email, password:$password){
    token
    user {
        id
        username
        email
    }
}
}
`;

export const ADD_USER =gql `
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username:$username, email:$email, password: $password) {
        token
        user {
            id
            username
            email
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook(userId:ID!, $bookData: BookInput!){
    saveBook(userID: $userId, bookData:$bookData){
        id 
        username
        email
        savedBook {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

export const REMOVE_BOOK =gql `
mutation deleteBook($userID: ID!, $bookId:String!) {
    deleteBook(userId: $userId, bookId:$bookId) {
        id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;