import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageUrl
      email
      firstName
      lastName
      followers {
        firstName
        lastName
        id
        profileImageUrl
      }
      comments {
        id
      }
      followings {
        firstName
        lastName
        id
        profileImageUrl
      }
      tweets {
        id
        content
      }
      comments {
        id
        content
      }
    }
  }
`);

export const getUser = graphql(`
  query GetUser($getUserUserId2: String!) {
    getUser(userId: $getUserUserId2) {
      id
      profileImageUrl
      email
      firstName
      lastName
      followers {
        firstName
        lastName
        id
        profileImageUrl
      }
      followings {
        firstName
        lastName
        id
        profileImageUrl
      }
      tweets {
        id
        content
      }
      comments {
        id
        content
      }
    }
  }
`);

export const getRecommendation = `
query GetRecommendations {
  getRecommendations {
    id
    firstName
    lastName
    profileImageUrl
  }
}
`;
