import { graphqlClient } from '@/clients/api';
import { CreateCommentInput, CreateTweetData, Tweet } from '@/gql/graphql';
import {
  createCommentMutation,
  createTweetMutation,
} from '@/graphql/mutation/tweet';
import {
  getAllTweetsQuery,
  getTweetWithCommentsQuery,
} from '@/graphql/query/tweets';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (payload: CreateTweetData) => {
      toast.loading('Creating Tweet', { id: '1' });
      return graphqlClient.request(createTweetMutation, {
        payload,
      });
    },
    onError: () => {
      toast.error('Something went wrong', { id: '1' });
    },
    onSuccess: () => {
      toast.success('Tweet created successfully', { id: '1' });
      queryClient.invalidateQueries({
        queryKey: ['allTweets'],
      });
    },
  });

  return { ...mutate };
};

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ['allTweets'],
    queryFn: async () => await graphqlClient.request(getAllTweetsQuery),
  });
  return {
    ...query,
    tweets: query.data?.getAllTweets as Tweet[],
  };
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (payload: CreateCommentInput) => {
      toast.loading('Creating Comment', { id: '1' });
      return graphqlClient.request(createCommentMutation, {
        payload,
      });
    },
    onError: () => {
      toast.error('Something went wrong', { id: '1' });
    },
    onSuccess: (result: any, payload: CreateCommentInput) => {
      toast.success('Tweet created successfully', { id: '1' });
      queryClient.invalidateQueries({
        queryKey: [payload.tweetId],
      });
    },
  });
  return { ...mutate };
};

export const useGetTweetWithComments = (tweetId: string) => {
  const query = useQuery({
    queryKey: [tweetId],
    queryFn: async () =>
      await graphqlClient.request(getTweetWithCommentsQuery, { tweetId }),
  });
  return { ...query, tweet: query.data?.getTweet as Tweet };
};
