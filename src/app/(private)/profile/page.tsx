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
      {/* Profile Info (Sticky aside on large screens, Header on small screens) */}
      <aside className="lg:max-w-sm lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-white p-6 mb-4 lg:mb-0 flex-shrink-0 sm:w-full">
        <ProfileInfo {...profileMock} />
      </aside>

      {/* Muro de Publicaciones */}
      <section className="lg:w-full p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">MURO DE PUBLICACIONES</h2>
        {/* Aquí puedes agregar el contenido de las publicaciones */}
      </section>
    </main>
  )
}

export default Profile
