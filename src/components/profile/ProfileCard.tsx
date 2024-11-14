// components/ProfileCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { FaGlobe } from 'react-icons/fa';
import { Badge } from '../ui/badge';
import { IBusinessResponse } from '@/types';

const ProfileCard: React.FC<IBusinessResponse> = ({
  name,
  categories,
  description,
  website,
  city,
  corporateEmail,
  country,
  address,
}) => {
  return (
    <Card className="max-w-md shadow-md border border-gray-300 rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
          {name}
        </CardTitle>
        <CardDescription className="text-sm">
          {city}, {country}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{description}</p>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 dark:text-white">Dirección:</p>
          <p className="text-sm">{address}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 dark:text-white">Categorias:</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm border border-gray-300 rounded-md px-4 py-2 flex items-center hover:bg-gray-100"
            >
              <FaGlobe className="mr-2" /> Sitio Web
            </a>
          )}
          {corporateEmail && (
            <a
              href={`mailto:${corporateEmail}`}
              className="text-sm border border-gray-300 rounded-md px-4 py-2 flex items-center hover:bg-gray-100"
            >
              Contacto
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
