/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom(
    $filter: ModelSubscriptionChatRoomFilterInput
    $owner: String
  ) {
    onCreateChatRoom(filter: $filter, owner: $owner) {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom(
    $filter: ModelSubscriptionChatRoomFilterInput
    $owner: String
  ) {
    onUpdateChatRoom(filter: $filter, owner: $owner) {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom(
    $filter: ModelSubscriptionChatRoomFilterInput
    $owner: String
  ) {
    onDeleteChatRoom(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
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
