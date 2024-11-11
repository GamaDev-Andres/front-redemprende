import PostsSection from "@/components/profile/PostsSection"
import ProfileInfo from "@/components/profile/ProfileInfo"

interface ProfileProps {
  businessName: string
  categories: string[]
  description: string
  location: string
  website?: string
  socialMedia?: string
}

const profileMock = {
  businessName: 'Mi Emprendimiento',
  categories: ['Tecnología', 'Alimentos', 'Moda'],
  description: 'Descripción del emprendimiento',
  location: 'Ciudad, Estado, País',
  website: 'https://miemprendimiento.com',
  socialMedia: '@miemprendimiento'
}

const Profile = () => {
  return (
    <main className="flex flex-col lg:flex-row">
      <aside className="lg:max-w-sm lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-background p-6 mb-4 lg:mb-0 flex-shrink-0 sm:w-full">
        <ProfileInfo {...profileMock} />
      </aside>
      <PostsSection/>
    </main>
  )
}

export default Profile
