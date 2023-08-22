/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      name
      description
      admin {
        id
        name
        email
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      chatRoomAdminId
      owner
      __typename
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        admin {
          id
          name
          email
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        chatRoomAdminId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAdmin = /* GraphQL */ `
  query GetAdmin($id: ID!) {
    getAdmin(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listAdmins = /* GraphQL */ `
  query ListAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
