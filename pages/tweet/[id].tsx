import FeedCard from '@/components/FeedCard';
import { Button } from '@/components/ui/button';
import { useCreateComment, useGetTweetWithComments } from '@/hooks/tweet';
import { useCurrentUser } from '@/hooks/user';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiArrowBack, BiImageAdd, BiUser } from 'react-icons/bi';
import TextareaAutosize from 'react-textarea-autosize';

const TweetIdPage = () => {
  const { user } = useCurrentUser();
  const { mutate } = useCreateComment();
  const params = useParams() as { id: string };
  const { tweet } = useGetTweetWithComments(params?.id);
  const router = useRouter()
  const [content, setContent] = useState<string>('');

  function decodeDate(date: any) {
    const datte = new Date(parseInt(date));
    return (
      <>
        {datte.getDate()}-{datte.getMonth()}-{datte.getFullYear()}
      </>
    );
  }

  function handleCreateComment() {
    const payload = {
      content,
      tweetId: tweet.id,
    };
    if (content.length < 1) return toast.error('Comment cannot be empty');
    mutate(payload);
    setContent('');
  }

  if (!tweet) return <div>something went wrong</div>;

  return (
    <>
      <Head>
        <title>
          Post | {tweet?.author?.firstName} {tweet?.author?.lastName}
        </title>
      </Head>
      <div className='h-14 px-3 flex items-center gap-3'>
        <Button
          size={'icon'}
          className='rounded-full bg-transparent text-xl'
          onClick={() => router.back()}
        >
          <BiArrowBack />
        </Button>
        <div>
          <h3 className='text-white text-lg font-semibold'>Post</h3>
          <p className='text-gray-300 text-sm'>
            {tweet?.comments?.length} comments
          </p>
        </div>
      </div>
      <FeedCard data={tweet} />
      <div className='p-5 grid grid-cols-12'>
        <div className='col-span-1'>
          {user?.profileImageUrl && (
            <Image
              src={user?.profileImageUrl}
              alt='profile image'
              width={40}
              height={40}
              className='rounded-full'
            />
          )}
        </div>
        {user && (
          <div className='w-full col-span-11 '>
            <div className='flex w-full items-start gap-5 justify-between'>
              <TextareaAutosize
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name='content'
                placeholder='Write a comment'
                className='min-w-[70%] flex-1 p-3   bg-gray-200/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                minRows={3}
                maxRows={10}
              ></TextareaAutosize>
              <Button
                onClick={handleCreateComment}
                className='max-w-20  bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-full py-2 mt-3'
              >
                Create
              </Button>
            </div>
          </div>
        )}
      </div>
      <div>
        {tweet.comments &&
          tweet?.comments.map((comment) => {
            return (
              <div className='border border-gray-900 p-5 hover:bg-white/5 cursor-pointer'>
                <div className='grid grid-cols-12'>
                  <div
                    className='
         col-span-1 
        '
                  >
                    {comment?.author?.profileImageUrl ? (
                      <Link href={`/profile/${comment?.author?.id}`}>
                        <Image
                          src={comment?.author?.profileImageUrl}
                          alt='profile image'
                          width={40}
                          height={40}
                          className='rounded-full'
                        />
                      </Link>
                    ) : (
                      <Button
                        // color='white'
                        size={'icon'}
                        variant={'ghost'}
                        className='rounded-full'
                      >
                        <BiUser
                          color='white'
                          className='!hover:text-black'
                          size={30}
                        />
                      </Button>
                    )}
                  </div>
                  <div className='col-span-10 flex gap-5 flex-col'>
                    <div className='flex flex-col gap-1 '>
                      <div>
                        <h1 className='text-white font-semibold'>
                          {comment?.author?.firstName}{' '}
                          {comment?.author?.lastName}
                        </h1>
                        <p className='text-gray-200 text-sm'>
                          {decodeDate(tweet.createdAt)}
                        </p>
                      </div>
                      <p className='text-gray-100 mt-2 tracking-wider'>
                        {comment?.content}
                      </p>
                    </div>
                  </div>{' '}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default TweetIdPage;
