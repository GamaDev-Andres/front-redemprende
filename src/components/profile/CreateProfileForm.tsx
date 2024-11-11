"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "../ui/multi-select";

interface FormValues {
  businessName: string;
  categories: string[];
  description: string;
  location: string;
  website: string;
  socialMedia: string;
}

const categoriesOptions = [
  { value: "technology", label: "Tecnología" },
  { value: "food", label: "Alimentos" },
  { value: "fashion", label: "Moda" },
  { value: "health", label: "Salud" },
  { value: "beauty", label: "Belleza" },
  // Puedes agregar más opciones
];

export default function BusinessForm() {
  const { handleSubmit, control, register, formState: { errors } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Datos del emprendimiento:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto p-8 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Registrar Emprendimiento</h1>
      
      <div>
        <Label htmlFor="businessName">Nombre de la Empresa</Label>
        <Input
          id="businessName"
          placeholder="Ej. Mi Emprendimiento"
          {...register("businessName", { required: "El nombre de la empresa es obligatorio." })}
        />
        {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName.message}</p>}
      </div>

      <div>
        <Label>Categorías</Label>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={categoriesOptions}
              placeholder="Selecciona una o más categorías"
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        {errors.categories && <p className="text-red-500 text-sm">Selecciona al menos una categoría.</p>}
      </div>
      <div>
        <Label htmlFor="description">Descripción del Emprendimiento</Label>
        <Textarea
          id="description"
          placeholder="Describe tu emprendimiento brevemente"
          {...register("description", { required: "La descripción es obligatoria." })}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="location">Ubicación</Label>
        <Input
          id="location"
          placeholder="Ciudad, País"
          {...register("location", { required: "La ubicación es obligatoria." })}
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>
      <div>
        <Label htmlFor="website">Sitio Web (opcional)</Label>
        <Input
          id="website"
          placeholder="https://miemprendimiento.com"
          {...register("website", {
            pattern: {
              value: /^https?:\/\/.*\..*$/,
              message: "Debe ser una URL válida.",
            },
          })}
        />
        {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
      </div>
      <div>
        <Label htmlFor="socialMedia">Redes Sociales (opcional)</Label>
        <Input
          id="socialMedia"
          placeholder="@miemprendimiento"
          {...register("socialMedia")}
        />
      </div>
      <Button type="submit" variant="default" className="w-full">
        Registrar Emprendimiento
      </Button>
    </form>
  );
}
