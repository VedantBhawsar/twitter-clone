/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation AddLike($payload: LikeData) {\n    addLike(payload: $payload)\n  }\n": types.AddLikeDocument,
    "\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData) {\n    createTweet(payload: $payload) {\n      content\n    }\n  }\n": types.CreateTweetDocument,
    "\n  #graphql\n  mutation CreateComment($payload: CreateCommentInput) {\n    createComment(payload: $payload) {\n      id\n    }\n  }\n": types.CreateCommentDocument,
    "\nmutation ChangeFollow($payload: FollowData) {\n    changeFollow(payload: $payload)\n  }\n": types.ChangeFollowDocument,
    "\n  #graphql\n  query GetAllTweets {\n    getAllTweets {\n      imageUrl\n      id\n      content\n      author {\n        profileImageUrl\n        lastName\n        firstName\n        id\n      }\n      like {\n        author {\n          id\n        }\n      }\n      comments {\n        id\n      }\n    }\n  }\n": types.GetAllTweetsDocument,
    "\n  #graphql\n  query GetTweet($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      id\n      imageUrl\n      content\n      createdAt\n      comments {\n        id\n        content\n        createdAt\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n      like {\n        author {\n          id\n        }\n      }\n      author {\n        id\n        profileImageUrl\n        firstName\n        lastName\n      }\n    }\n  }\n": types.GetTweetDocument,
    "\n  #graphql\n  query verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.VerifyUserGoogleTokenDocument,
    "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      comments {\n        id\n      }\n      followings {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n      }\n      comments {\n        id\n        content\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  query GetUser($getUserUserId2: String!) {\n    getUser(userId: $getUserUserId2) {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      followings {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n      }\n      comments {\n        id\n        content\n      }\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation AddLike($payload: LikeData) {\n    addLike(payload: $payload)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation AddLike($payload: LikeData) {\n    addLike(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData) {\n    createTweet(payload: $payload) {\n      content\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreateTweet($payload: CreateTweetData) {\n    createTweet(payload: $payload) {\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreateComment($payload: CreateCommentInput) {\n    createComment(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreateComment($payload: CreateCommentInput) {\n    createComment(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ChangeFollow($payload: FollowData) {\n    changeFollow(payload: $payload)\n  }\n"): (typeof documents)["\nmutation ChangeFollow($payload: FollowData) {\n    changeFollow(payload: $payload)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetAllTweets {\n    getAllTweets {\n      imageUrl\n      id\n      content\n      author {\n        profileImageUrl\n        lastName\n        firstName\n        id\n      }\n      like {\n        author {\n          id\n        }\n      }\n      comments {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAllTweets {\n    getAllTweets {\n      imageUrl\n      id\n      content\n      author {\n        profileImageUrl\n        lastName\n        firstName\n        id\n      }\n      like {\n        author {\n          id\n        }\n      }\n      comments {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetTweet($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      id\n      imageUrl\n      content\n      createdAt\n      comments {\n        id\n        content\n        createdAt\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n      like {\n        author {\n          id\n        }\n      }\n      author {\n        id\n        profileImageUrl\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetTweet($tweetId: String!) {\n    getTweet(tweetId: $tweetId) {\n      id\n      imageUrl\n      content\n      createdAt\n      comments {\n        id\n        content\n        createdAt\n        author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n      }\n      like {\n        author {\n          id\n        }\n      }\n      author {\n        id\n        profileImageUrl\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["\n  #graphql\n  query verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      comments {\n        id\n      }\n      followings {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n      }\n      comments {\n        id\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      comments {\n        id\n      }\n      followings {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n      }\n      comments {\n        id\n        content\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($getUserUserId2: String!) {\n    getUser(userId: $getUserUserId2) {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      followings {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n      }\n      comments {\n        id\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUser($getUserUserId2: String!) {\n    getUser(userId: $getUserUserId2) {\n      id\n      profileImageUrl\n      email\n      firstName\n      lastName\n      followers {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      followings {\n        firstName\n        lastName\n        id\n        profileImageUrl\n      }\n      tweets {\n        id\n        content\n      }\n      comments {\n        id\n        content\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;