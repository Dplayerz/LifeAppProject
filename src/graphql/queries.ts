

export const listPosts = /* GraphQL */ `
query ListPosts {
  listPosts {
    items {
      id
      content
      likes {
        items {
          id
        }
      }
    }
  }
}
`;

// src/graphql/mutations.ts
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