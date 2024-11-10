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
  const ProfileInfo = ({
    businessName = profileMock.businessName,
    categories = profileMock.categories,
    description = profileMock.description,
    location = profileMock.location,
    website = profileMock.website,
    socialMedia = profileMock.socialMedia
  }: ProfileProps) => {
    return (
      <div className='max-w-sm mx-auto bg-white rounded-lg p-8 space-y-6'>
        <h1 className='text-3xl font-bold'>{businessName}</h1>
  
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold text-gray-700'>Categorías</h2>
          <div className='flex flex-wrap gap-2'>
            {categories.map(category => (
              <span
                key={category}
                className='bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium'
              >
                {category}
              </span>
            ))}
          </div>
        </div>
  
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold text-gray-700'>Descripción</h2>
          <p className='text-gray-600'>{description}</p>
        </div>
  
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold text-gray-700'>Ubicación</h2>
          <p className='text-gray-600'>{location}</p>
        </div>
  
        {website && (
          <div className='space-y-2'>
            <h2 className='text-lg font-semibold text-gray-700'>Sitio Web</h2>
            <a
              href={website}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
            >
              {website}
            </a>
          </div>
        )}
  
        {socialMedia && (
          <div className='space-y-2'>
            <h2 className='text-lg font-semibold text-gray-700'>
              Redes Sociales
            </h2>
            <p className='text-gray-600'>{socialMedia}</p>
          </div>
        )}
      </div>
    )
  }
  
  export default ProfileInfo
  