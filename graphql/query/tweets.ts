import { graphql } from '@/gql';

export const getAllTweetsQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      imageUrl
      id
      content
      author {
        profileImageUrl
        lastName
        firstName
        id
      }
      like {
        author {
          id
        }
      }
      comments {
        id
      }
    }
  }
`);

export const getTweetWithCommentsQuery = graphql(`
  #graphql
  query GetTweet($tweetId: String!) {
    getTweet(tweetId: $tweetId) {
      id
      imageUrl
      content
      createdAt
      comments {
        id
        content
        createdAt
        author {
          id
          firstName
          lastName
          profileImageUrl
        }
      }
      like {
        author {
          id
        }
      }
      author {
        id
        profileImageUrl
        firstName
        lastName
      }
    }
  }
`);
