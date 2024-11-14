"use client"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IProfileResponse } from "@/types";

interface ProfileProps {
  data: IProfileResponse | undefined;
}

const ProfileInfo = (props: ProfileProps) => {
  const { data } = props;

  if (!data) {
    return <p className="text-center text-gray-500">No hay información disponible.</p>;
  }
  
  return (
    <Card className="max-w-sm mx-auto shadow-none border-none p-0">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{data.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Categorías</h2>
          <div className="flex flex-wrap gap-2">
            {data.categories.map((category) => (
              <Badge key={category.id} className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 dark:bg-slate-300">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Descripción</h2>
          <p>{data.description}</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Ubicación</h2>
          <p>
            {data.city}, {data.country}
          </p>
          {data.address && <p>{data.address}</p>}
        </div>

        {data.website && (
          <>
            <Separator />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Sitio Web</h2>
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {data.website}
              </a>
            </div>
          </>
        )}

        {data.corporateEmail && (
          <>
            <Separator />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Correo Corporativo</h2>
              <p>{data.corporateEmail}</p>
            </div>
          </>
        )}

        {data.nit && (
          <>
            <Separator />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">NIT</h2>
              <p>{data.nit}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
