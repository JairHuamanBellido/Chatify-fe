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
      createdAt
      updatedAt
      chatRoomAdminId
      owner
      __typename
    }
  }
`;
export const onCreateAdmin = /* GraphQL */ `
  subscription OnCreateAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onCreateAdmin(filter: $filter, owner: $owner) {
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
export const onUpdateAdmin = /* GraphQL */ `
  subscription OnUpdateAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onUpdateAdmin(filter: $filter, owner: $owner) {
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
export const onDeleteAdmin = /* GraphQL */ `
  subscription OnDeleteAdmin(
    $filter: ModelSubscriptionAdminFilterInput
    $owner: String
  ) {
    onDeleteAdmin(filter: $filter, owner: $owner) {
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
