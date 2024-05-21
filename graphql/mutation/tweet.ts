import { graphql } from '@/gql';

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetData) {
    createTweet(payload: $payload) {
      content
    }
  }
`);

export const createCommentMutation = graphql(`
  #graphql
  mutation CreateComment($payload: CreateCommentInput) {
    createComment(payload: $payload) {
      id
    }
  }
`);
