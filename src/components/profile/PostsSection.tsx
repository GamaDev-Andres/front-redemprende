import React from 'react'
import PostCard from './PostCard'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import AddPostModal from './AddPostModal'
import { useGetAllPostsQuery } from '@/queries/post'

const PostsSection = () => {
  const { id } = useParams()
  const { data: session } = useSession()
  const {data} = useGetAllPostsQuery(Number(id) ?? 0)
  
  return (
    <section className='lg:w-full p-6 bg-gray-50 dark:bg-slate-900'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>
        MURO DE PUBLICACIONES
      </h2>
      {session?.user.id.toString() === id && <AddPostModal />}
      <div className='grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4'>
        {(data?? []).map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
}

export default PostsSection
