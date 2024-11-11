import React from 'react'
import PostCard from './PostCard'

const PostsSection = () => {
  return (
    <section className='lg:w-full p-6 bg-gray-50 dark:bg-slate-900'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>MURO DE PUBLICACIONES</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4'>
        {[1, 2, 3, 4].map(post => (
          <PostCard key={post} />
        ))}
      </div>
    </section>
  )
}

export default PostsSection
