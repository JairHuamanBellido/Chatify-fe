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
      messages {
        items {
          id
          text
          type
          createdAt
          chatRoomId
          updatedAt
          chatRoomMessagesId
          messageSenderId
          owner
          __typename
        }
        nextToken
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
        messages {
          nextToken
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      text
      sender {
        id
        name
        email
        createdAt
        updatedAt
        owner
        __typename
      }
      type
      createdAt
      chatRoomId
      updatedAt
      chatRoomMessagesId
      messageSenderId
      owner
      __typename
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        sender {
          id
          name
          email
          createdAt
          updatedAt
          owner
          __typename
        }
        type
        createdAt
        chatRoomId
        updatedAt
        chatRoomMessagesId
        messageSenderId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const messagesByDate = /* GraphQL */ `
  query MessagesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        sender {
          id
          name
          email
          createdAt
          updatedAt
          owner
          __typename
        }
        type
        createdAt
        chatRoomId
        updatedAt
        chatRoomMessagesId
        messageSenderId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
