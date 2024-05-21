import { graphqlClient } from '@/clients/api';
import { AddLikeMutation, LikeData } from '@/gql/graphql';
import { changeLikeMutation } from '@/graphql/mutation/like';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useLike = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (payload: LikeData) => {
      return graphqlClient.request(changeLikeMutation, {
        payload,
      });
    },
    onError: () => {
      toast.error('Something went wrong', { id: '1' });
    },
    onSuccess: (data: AddLikeMutation, payload: LikeData) => {
      toast.success(data.addLike as string, { id: '1' });
      queryClient.invalidateQueries({
        queryKey: ['allTweets'],
      });
      queryClient.invalidateQueries({
        queryKey: [payload.tweetId],
      });
    },
  });

  return { ...mutate };
};
