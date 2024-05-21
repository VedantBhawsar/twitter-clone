import { graphqlClient } from "@/clients/api";
import { FollowData, User } from "@/gql/graphql";
import { changeFollowMutation } from "@/graphql/mutation/user";
import {
  getCurrentUserQuery,
  getRecommendation,
  getUser,
} from "@/graphql/query/user";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
  });

  return {
    ...query,
    user: query.data?.getCurrentUser,
  };
};

export const useGetUser = (userId: string) => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      graphqlClient.request(getUser, {
        getUserUserId2: userId,
      }),
  });

  return { ...query, user: query.data?.getUser };
};

export const useRecommendation = () => {
  const query: UseQueryResult<{ getRecommendations?: User[] }, Error> =
    useQuery({
      queryKey: ["recommended-user"],
      queryFn: async () => {
        const { getRecommendations } = await graphqlClient.request<{
          getRecommendations: User[];
        }>(getRecommendation);
        return { getRecommendations };
      },
    });

  return { ...query, recommendations: query.data?.getRecommendations };
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (payload: FollowData) => {
      return graphqlClient.request(changeFollowMutation, { payload });
    },
    onSuccess: () => {
      toast.success(`Followed`);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
    onError: () => {
      toast.error("Something went wrong!!");
    },
  });
  return { ...mutate };
};
