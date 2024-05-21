import { Button } from "@/components/ui/button";
import { useCurrentUser, useFollowUser, useGetUser } from "@/hooks/user";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiArrowBack, BiUser } from "react-icons/bi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedCard from "@/components/FeedCard";
import { FollowData, Tweet, User } from "@/gql/graphql";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ProfileIdPage() {
  const params = useParams();
  const { mutate } = useFollowUser();
  const { user } = useGetUser((params?.userId as string) ?? "");
  const { user: currentUser } = useCurrentUser();
  const router = useRouter();
  let username = user?.firstName + " " + user?.lastName;
  let totalTweets = user?.tweets?.length;
  let totalComments = user?.comments?.length;

  function handleFollow() {
    const payload: FollowData = {
        userId: user?.id ?? "",
    };
    mutate(payload);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>
          Profile | {user?.firstName} {user?.lastName}
        </title>
      </Head>
      <div className="min-h-14 px-3 p-1 flex items-center gap-3 border-b border-gray-100/20">
        <Button
          size={"icon"}
          className="rounded-full bg-transparent text-xl"
          onClick={() => router.back()}
        >
          <BiArrowBack />
        </Button>
        <div>
          <h3 className="text-white text-lg font-semibold">{username}</h3>
          <p className="text-gray-300 text-sm">
            {totalTweets} tweets and {totalComments} comments
          </p>
        </div>
      </div>

      {/* profile section */}
      <div className="text-white">
        <div className="h-44 bg-[#0D0D0D] rounded-lg">back pic</div>
        <div className="flex  justify-between p-5 pb-0">
          <Image
            alt="profile image"
            src={user?.profileImageUrl ?? ""}
            width={180}
            height={180}
            className="rounded-full -mt-20"
          />
          {currentUser?.followings?.find((a: any) => a?.id === user?.id) ? (
            <Button
              onClick={handleFollow}
              variant={"ghost"}
              className="rounded-full border border-white"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onClick={handleFollow}
              variant={"secondary"}
              className="rounded-full"
            >
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-semibold">
            {user?.firstName} {user?.lastName}{" "}
          </h3>
          <p className="text-gray-300 text-base">{user?.email}</p>
          <div
            className="flex gap-3 mt-1
          "
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="text-base p-0 hover:bg-transparent hover:text-gray-300"
                >
                  {user?.followings?.length} Following
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-[#0D0D0D]  text-white border-[#1F1F1F]">
                <DialogHeader>
                  <DialogTitle>Following</DialogTitle>
                </DialogHeader>
                <div>
                  {user?.followings &&
                    user?.followings.length > 0 &&
                    user?.followings.map((oneFollowing) => {
                      const following = oneFollowing as User;
                      return (
                        <Button
                          key={following.id}
                          variant={"ghost"}
                          className="flex w-full justify-between py-7 hover:bg-[#2D2D2D] hover:text-white"
                        >
                          <div className="flex gap-3 items-center ">
                            <Image
                              src={following.profileImageUrl || ""}
                              alt="user image"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <h5 className="font-bold">
                              {following.firstName} {following.lastName}
                            </h5>
                          </div>
                          {user?.followers?.find(
                            (a: any) => a?.id === following.id
                          ) ? (
                            <Button
                              className="rounded-full"
                              variant={"secondary"}
                              onClick={() => alert("hello")}
                            >
                              Following
                            </Button>
                          ) : (
                            <Button
                              className="rounded-full"
                              variant={"secondary"}
                              onClick={() => alert("hello")}
                            >
                              Follow
                            </Button>
                          )}
                        </Button>
                      );
                    })}
                </div>
                <DialogFooter>
                  <div className="w-full flex justify-center">
                    <p className="text-sm text-gray-400">You reached the end</p>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="text-base p-0 hover:bg-transparent hover:text-gray-300"
                >
                  {user?.followers?.length} Follower
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-[#0D0D0D]  text-white border-[#1F1F1F]">
                <DialogHeader>
                  <DialogTitle>Followers</DialogTitle>
                </DialogHeader>
                <div>
                  {user?.followers &&
                    user?.followers.length > 0 &&
                    user?.followers.map((onefollower) => {
                      const follower = onefollower as User;
                      return (
                        <Button
                          key={follower.id}
                          variant={"ghost"}
                          className="flex w-full justify-between py-7 hover:bg-[#2D2D2D] hover:text-white"
                        >
                          <div className="flex gap-3 items-center ">
                            <Image
                              src={follower.profileImageUrl || ""}
                              alt="user image"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <h5 className="font-bold">
                              {follower.firstName} {follower.lastName}
                            </h5>
                          </div>
                          {user?.followings?.find(
                            (a: any) => a?.id === follower.id
                          ) ? (
                            <Button
                              className="rounded-full"
                              variant={"secondary"}
                              onClick={() => alert("hello")}
                            >
                              Following
                            </Button>
                          ) : (
                            <Button
                              className="rounded-full"
                              variant={"secondary"}
                              onClick={() => alert("hello")}
                            >
                              Follow
                            </Button>
                          )}
                        </Button>
                      );
                    })}
                </div>
                <DialogFooter>
                  <div className="w-full flex justify-center">
                    <p className="text-sm text-gray-400">You reached the end</p>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Tabs defaultValue="tweets" className="w-full ">
        <TabsList className="grid w-full grid-cols-2 bg-[#0D0D0D] h-[3.3rem] overflow-hidden border-gray-100/20 border">
          <TabsTrigger value="tweets" className="py-3">
            Tweets
          </TabsTrigger>
          <TabsTrigger value="comments" className="py-3">
            Comments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tweets">
          {user?.tweets &&
            user?.tweets.map((tweet: any, index) => {
              const data: Tweet = {
                ...tweet,
                author: user,
              };
              return <FeedCard data={data} />;
            })}
        </TabsContent>
        <TabsContent value="comments">
          {user?.comments &&
            user?.comments.map((comments: any, index) => {
              const comment = {
                ...comments,
                author: user,
              };
              return (
                <div className="border border-gray-900 p-5 hover:bg-white/5 cursor-pointer">
                  <div className="grid grid-cols-12">
                    <div
                      className="
         col-span-1 
        "
                    >
                      {comment?.author?.profileImageUrl ? (
                        <Link href={`/profile/${comment?.author?.id}`}>
                          <Image
                            src={comment?.author?.profileImageUrl}
                            alt="profile image"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </Link>
                      ) : (
                        <Button
                          // color='white'
                          size={"icon"}
                          variant={"ghost"}
                          className="rounded-full"
                        >
                          <BiUser
                            color="white"
                            className="!hover:text-black"
                            size={30}
                          />
                        </Button>
                      )}
                    </div>
                    <div className="col-span-10 flex gap-5 flex-col">
                      <div className="flex flex-col gap-1 ">
                        <div>
                          <h1 className="text-white font-semibold">
                            {comment?.author?.firstName}{" "}
                            {comment?.author?.lastName}
                          </h1>
                        </div>
                        <p className="text-gray-100 mt-2 tracking-wider">
                          {comment?.content}
                        </p>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              );
            })}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default ProfileIdPage;
