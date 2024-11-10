"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = () => signIn("google");
  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Pagina de autenticación</h1>
      {session ? (
        <div className="text-center">
          <p className="mb-4">Welcome, {session.user?.name}!</p>
          <Button variant="default" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      ) : (
        <Button variant="default" onClick={handleLogin}>
         Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default AuthPage;
