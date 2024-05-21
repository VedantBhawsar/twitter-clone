import { graphql } from "@/gql";

export const changeFollowMutation = graphql(`
mutation ChangeFollow($payload: FollowData) {
    changeFollow(payload: $payload)
  }
`)