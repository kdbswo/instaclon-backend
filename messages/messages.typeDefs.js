import { gql } from "apollo-server-express";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    createAt: String!
    updateAt: String!
  }
  type Room {
    id: Int!
    user: [User]
    messages: [Messages]
    createAt: String!
    updateAt: String!
  }
`;
