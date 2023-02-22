import { gql } from "apollo-server";

export default gql`
  type SearchUsersResult {
    searchedUsers: [User]
    totalSearchPages: Int
  }
  type Query {
    searchUsers(keyword: String!, page: Int!): SearchUsersResult!
  }
`;
