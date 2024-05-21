import Image from 'next/image';
import React from 'react';
import { BiMessageRounded, BiUpload, BiUser } from 'react-icons/bi';
import { Button } from '../ui/button';
import { FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { Tweet } from '@/gql/graphql';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { useCurrentUser } from '@/hooks/user';
import { useLike } from '@/hooks/like';

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  const { user } = useCurrentUser();

  const { mutate } = useLike();

  function handleLike() {
    mutate({ tweetId: data.id });
  }

  return (
    <div className='border border-gray-900 p-5 hover:bg-white/5 cursor-pointer'>
      <div className='grid grid-cols-12'>
        <div
          className='
         col-span-1 
        '
        >
          {data.author?.profileImageUrl ? (
            <Link href={ data.author.id === user?.id ? `/profile` : `/profile/${data.author?.id}` }>
              <Image
                src={data.author?.profileImageUrl}
                alt='profile image'
                width={40}
                height={40}
                className='rounded-full'
              />
            </Link>
          ) : (
            <Button
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
            <h1 className='text-white font-semibold'>
              {data.author?.firstName} {data.author?.lastName}
            </h1>
            <Link href={`/tweet/${data.id}`}>
              <p className='text-gray-200 tracking-wider'>{data.content}</p>
            </Link>
          </div>
          {data.imageUrl && (
            <div>
              <Image
                src={data.imageUrl}
                className='rounded-lg w-56 h-64 '
                alt='profile image '
                width={1080}
                height={720}
              />
            </div>
          )}

          <div className='flex justify-between'>
            <Button
              variant={'ghost'}
              className='flex items-center gap-2 hover:bg-transparent hover:text-white p-0'
            >
              <BiMessageRounded
                size={20}
                className='cursor-pointer text-gray-400'
              />
              <span className='text-gray-400'>{data.comments?.length}</span>
            </Button>
            <Button
              className='flex items-center gap-2 hover:bg-transparent hover:text-white p-0'
              variant={'ghost'}
            >
              <AiOutlineRetweet
                size={20}
                className='cursor-pointer text-gray-400'
              />
            </Button>
            <Button
              onClick={handleLike}
              className='flex items-center gap-2 hover:bg-transparent hover:text-white p-0'
              variant={'ghost'}
            >
              {data.like &&
              data.like?.filter((like1) => like1?.author?.id === user?.id)
                .length > 0 ? (
                <BsHeartFill
                  className='text-red-500 cursor-pointer'
                  size={20}
                />
              ) : (
                <AiOutlineHeart
                  size={20}
                  className='cursor-pointer text-gray-400'
                />
              )}
              <span className='text-gray-400'>{data.like?.length}</span>
            </Button>
            <Button
              className='flex items-center gap-2 hover:bg-transparent hover:text-white p-0'
              variant={'ghost'}
            >
              <BiUpload
                size={20}
                className='cursor-pointer text-gray-400'
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
