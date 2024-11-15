"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const urlBackend = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setError("");
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch(`${urlBackend}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (res.ok) {
        toast.success("Registro exitoso!");
        reset();
      } else {
        const data = await res.json();
        setError(data.message || "Error al registrar.");
      }
    } catch {
      setError("Error al registrar.");
    }
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="p-8 shadow-lg rounded-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" variant="default" className="w-full mt-6">
          Registrarse
        </Button>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;