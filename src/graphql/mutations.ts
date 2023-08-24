/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
