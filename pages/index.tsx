import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { BsBell, BsBookmark, BsEnvelope, BsHash } from 'react-icons/bs';
import { BiHome, BiImageAdd, BiUser } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';
import React, { KeyboardEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import FeedCard from '@/components/FeedCard';
import { CredentialResponse } from '@react-oauth/google';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import toast from 'react-hot-toast';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';
import TextareaAutosize from 'react-textarea-autosize';
import { useUploadImage } from '@/hooks/image';
import Link from 'next/link';

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const [content, setContent] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null) 
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { image, setImage, uploadImage } = useUploadImage();

  const handleCreateTweet = async () => {
    if (content.length < 5) {
      if (content.length < 1) {
        toast.error('Tweet cannot be empty');
      } else {
        toast.error('Tweet must have at least 5 letters');
      }
    } else {
      const payload = {
        content,
        imageUrl: image,
      };
      mutate(payload);
      setContent('');
      setImage('');
    }
  };

  function handleSubmit(event: React.KeyboardEvent<HTMLTextAreaElement>
  ){
    if(event.key === 'Enter') {
        submitBtnRef.current?.click()
    }
  }

  return (
    <>
      <div className='border-2 border-gray-900  flex w-full p-5 filter backdrop-blur bg-slate-700/10'>
        <h2 className='text-white font-semibold tracking-wider text-lg '>
          Home
        </h2>
      </div>
      <div
        // onSubmit={handleCreateTweet}
        className='p-5 grid grid-cols-12'
      >
        <div className='col-span-1'>
          {user?.profileImageUrl && (
            <Link href={'/profile'}>
              <Image
                src={user?.profileImageUrl}
                alt='profile image'
                width={40}
                height={40}
                className='rounded-full'
              />
            </Link>
          )}
        </div>
        {user && (
          <div className='w-full col-span-11 '>
            <div className='flex w-full items-start gap-5 justify-between'>
              <TextareaAutosize
              onKeyDown={handleSubmit}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name='content'
                placeholder='Write a tweet'
                className='min-w-[70%] flex-1 p-3   bg-gray-200/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                minRows={3}
                maxRows={10}
              ></TextareaAutosize>
              <div className='flex flex-col'>
                <Button
                ref={submitBtnRef}
                  onClick={handleCreateTweet}
                  className='max-w-20  bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-full py-2 mt-3'
                >
                  Tweet
                </Button>
                <input
                  type='file'
                  id='fileInput'
                  ref={inputRef}
                  accept='image/*'
                  className='hidden'
                  onChange={uploadImage}
                />
                <label
                  htmlFor='fileInput'
                  className='w-fit'
                >
                  <BiImageAdd
                    className='text-white  hover:text-gray-200 mt-5 ml-1 cursor-pointer'
                    size={25}
                  />
                </label>
              </div>
            </div>
            {image && (
              <div className='relative mt-5 w-fit'>
                <button
                  className='bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-full p-[1.5px] absolute -mt-2 -right-3'
                  onClick={() => setImage('')}
                >
                  <IoIosClose className='text-2xl' />
                </button>
                <Image
                  className='rounded-lg bg-gray-100/10 object-cover w-48 h-56 mt-1'
                  src={image}
                  alt='upload image'
                  height={1080}
                  width={720}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {tweets?.map((tweet: Tweet) => (
        <FeedCard
          key={tweet.id}
          data={tweet}
        />
      ))}
    </>
  );
}
