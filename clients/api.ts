import { GraphQLClient } from 'graphql-request';

const isClient = typeof window !== 'undefined';

console.log(process.env.NEXT_PUBLIC_API_URL)


export const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL as string,
  {
    headers: () => ({
      Authorization: isClient
        ? `Bearer ${window.localStorage.getItem('__twitter_token')}`
        : '',
    }),
  }
);


