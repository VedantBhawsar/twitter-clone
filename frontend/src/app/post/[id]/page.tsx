import { CreatePost } from '@components/HomeComponents/CreatePost'
import { Navbar } from '@components/HomeComponents/Navbar'
import { Post } from '@components/HomeComponents/Posts'
import React from 'react'

const PostPage = () => {
  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600">
      <Navbar />
      <div className="flex flex-col overflow-y-scroll max-h-[90%]">
        <Post />
        <CreatePost />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  )
}

export default PostPage