"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCreateProfile = () => {
    router.push("/create-profile");
  };
  const handleExplore = () => {
    router.push("/explore");
  };

  return (
<div className="relative min-h-screen p-8 sm:p-20 flex flex-col items-center justify-center text-center font-[family-name:var(--font-geist-sans)] bg-gradient-to-r">
      {/* Fondo decorativo adicional */}

      {/* Contenido principal */}
      <h1 className="text-5xl font-bold">
        ¡Bienvenidos Emprendedores de Villavicencio!
      </h1>
      <p className="text-lg mt-4 max-w-2xl">
        Esta página está diseñada especialmente para que puedas promocionar tu
        emprendimiento y conectar con otros emprendedores locales. Aquí podrás
        crear un perfil para mostrar tus productos o servicios, aumentar tu
        visibilidad y hacer crecer tu negocio.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button variant="outline" onClick={handleCreateProfile}>
          Crear Perfil
        </Button>
        <Button variant="default" onClick={handleExplore}>
          Explorar emprendimientos
        </Button>
      </div>
    </div>
  );
}
