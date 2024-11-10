"use client";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session }	 = useSession()
  console.log(session);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      HELLO WORLD
      <div>
        {session ? (
          <h1>welcome back </h1>
        ): (
          <h1>not signed in</h1>
        )}
      </div>
    </div>
  );
}
