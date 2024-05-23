import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiCloset, BiCross, BiHome, BiImageAdd, BiUser } from "react-icons/bi";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  BsBell,
  BsBookmark,
  BsEnvelope,
  BsHash,
  BsTwitter,
} from "react-icons/bs";
import { DialogClose } from "@radix-ui/react-dialog";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useCurrentUser, useRecommendation } from "@/hooks/user";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useUploadImage } from "@/hooks/image";
import { useCreateTweet } from "@/hooks/tweet";
import { useQueryClient } from "@tanstack/react-query";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

interface SidebarOption {
  label: string;
  icon: React.ReactElement;
  link: string;
}

const sideBarMenuItems: SidebarOption[] = [
  {
    label: "Home",
    icon: <BiHome />,
    link: "/",
  },
  {
    label: "Explore",
    icon: <BsHash />,
    link: "/explore",
  },
  {
    label: "Notifications",
    icon: <BsBell />,
    link: "/notifications",
  },
  {
    label: "Messages",
    icon: <BsEnvelope />,
    link: "/messages",
  },
  {
    label: "Bookmarks",
    icon: <BsBookmark />,
    link: "/bookmarks",
  },
  {
    label: "Profile",
    icon: <BiUser />,
    link: "/profile",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useCurrentUser();
  const [content, setContent] = useState<string>("");
  const { image, setImage } = useUploadImage();
  const { recommendations } = useRecommendation();
  console.log(recommendations);
  const { mutate } = useCreateTweet();
  const queryClient = useQueryClient();

  const handleCreateTweet = async () => {
    if (content.length < 5) {
      if (content.length < 1) {
        toast.error("Tweet cannot be empty");
      } else {
        toast.error("Tweet must have at least 5 letters");
      }
    } else {
      const payload = {
        content,
        imageUrl: image,
      };
      mutate(payload);
      setContent("");
      setImage("");
    }
  };

  const handleLogin = useCallback(
    async (cred: CredentialResponse) => {
      if (!cred.credential) return toast.error("Invalid credentials");
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: cred.credential,
        }
      );
      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      toast.success("User logged in");
      await queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
    [queryClient]
  );

  const handleLogout = () => {
    window.localStorage.removeItem("__twitter_token");
    queryClient.invalidateQueries({
      queryKey: ["current-user"],
    });
  };

  return (
    <div className="bg-black w-screen  h-screen grid grid-cols-12 px-0 lg:px-56">
      <div className="hidden md:flex col-span-3  p-10 pb-3 flex-col justify-between">
        <div>
          <BsTwitter color="white" className="text-3xl ml-3" />
          <ul className="mt-6 flex gap-3 flex-col">
            {sideBarMenuItems.map((option: SidebarOption, index: number) => {
              return (
                <Link href={option.link} key={index}>
                  <li
                    key={index}
                    className={cn(
                      "flex gap-3 w-fit text-gray-300 text-xl font-normal items-center py-2 px-3  hover:bg-gray-300/20 rounded-full",
                      option.label == "Home"
                        ? "text-white text-xl font-semibold"
                        : "text-gray-300 text-xl font-normal"
                    )}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </li>
                </Link>
              );
            })}
            {user && (
              <Dialog
                onOpenChange={(open) => {
                  if (!open) {
                    setContent("");
                    setImage("");
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-full py-6 mt-3">
                    Tweet
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-[#0D0D0D]  text-white border-[#1F1F1F]">
                  <DialogHeader>
                    <DialogTitle>Create Tweet</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Share your thoughts with your friends and family. Click
                      save when you&apos;re done. (
                      <span className="text-red-400">
                        use feed input to upload image
                      </span>
                      )
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <TextareaAutosize
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      name="content"
                      placeholder="Write a tweet"
                      className="min-w-[70%] flex-1 p-3 placeholder:text-sm   bg-gray-200/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      minRows={3}
                      maxRows={15}
                    ></TextareaAutosize>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button
                        onClick={handleCreateTweet}
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-full"
                      >
                        Tweet
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </ul>
        </div>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="relative flex gap-3  bg-gray-100/10 hover:bg-gray-100/20 active:bg-gray-100/30 cursor-pointer p-4 rounded-full">
              {" "}
              {user?.profileImageUrl && (
                <Image
                  src={user?.profileImageUrl}
                  alt="profile image"
                  width={45}
                  height={45}
                  className="rounded-full"
                />
              )}
              <div className="overflow-hidden text-start">
                <h3 className="font-semibold text-lg text-gray-100">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-gray-300 text-sm">{user?.email}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-100/10 border border-gray-100/20 rounded-lg text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-1 cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <BiUser />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-1 cursor-pointer"
                onClick={handleLogout}
              >
                <IoIosLogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-6  border-x border-gray-900 h-full overflow-y-scroll w-full">
        {children}
      </div>
      <div className="col-span-3 p-5 hidden lg:block">
        {user ? (
          <div className="p-5 my-1 min-h-[150px] border flex flex-col gap-5 border-gray-800 bg-gray-200/10 rounded-lg">
            <h1
              className="text-white text-xl font-bold
       "
            >
              People you may know
            </h1>
            <div>
              {recommendations && recommendations.length > 0 ? (
                recommendations?.map((recUser) => {
                  return (
                    <Button
                      
                      key={recUser.id}
                      variant={"ghost"}
                      className="flex w-full justify-between py-7 px-0 hover:bg-[#2D2D2D] hover:text-white"
                    >
                      <div className="flex gap-3 items-center ">
                        <Image
                          src={recUser.profileImageUrl || ""}
                          alt="user image"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <Link href={`/profile/${recUser.id}`} className="font-bold text-white">
                          {recUser.firstName} {recUser.lastName}
                        </Link>
                      </div>
                      <Button
                        className="rounded-full"
                        variant={"secondary"}
                        onClick={() => alert("hello")}
                      >
                        Follow
                      </Button>
                    </Button>
                  );
                })
              ) : (
                <p className="text-sm text-center text-gray-200 p-2 mt-1">
                  No recommendations found
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-5 my-1 border flex flex-col gap-5 border-gray-800 bg-gray-200/10 rounded-lg">
            <h1
              className="text-white text-xl font-bold
          "
            >
              New to Twitter
            </h1>
            <GoogleLogin
              size="large"
              theme="filled_black"
              onSuccess={handleLogin}
            />
          </div>
        )}
      </div>
    </div>
  );
}
