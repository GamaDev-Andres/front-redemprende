"use client"
import PostsSection from '@/components/profile/PostsSection'
import ProfileInfo from '@/components/profile/ProfileInfo'
import { useGetProfileByIdQuery } from '@/queries/profile'
import { useRouter } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}
const Profile = ({ params }: Props) => {
  console.log({ params })
  const { data, isError } = useGetProfileByIdQuery(params?.id ?? '')
  const { push } = useRouter()
  if (isError) return push('/')
  return (
    <main className='flex flex-col lg:flex-row'>
      <aside className='lg:max-w-sm lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-background p-6 mb-4 lg:mb-0 flex-shrink-0 sm:w-full'>
        <ProfileInfo data={data} />
      </aside>
      <PostsSection />
    </main>
  )
}

export default Profile
