/* tslint:disable */
/* eslint-disable */

export const createLike = /* GraphQL */ `
  mutation CreateLike($input: CreateLikeInput!) {
    createLike(input: $input) {
      id
      postID
      userID
      createdAt
    }
  }
`;
