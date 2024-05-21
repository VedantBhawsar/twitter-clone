import { graphql } from '@/gql';

export const changeLikeMutation = graphql(`
  #graphql
  mutation AddLike($payload: LikeData) {
    addLike(payload: $payload)
  }
`);
