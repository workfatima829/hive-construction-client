// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function WelcomePage() {
//   const router = useRouter();
//   const [name, setName] = useState("");

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!user || !token) {
//       router.push("/");
//       return;
//     }

//     const parsedUser = JSON.parse(user);
//     setName(
//       parsedUser.username
//     );
//   }, [router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <h1 className="text-3xl font-bold text-black">
//         Welcome, <span className="text-blue-600">{name}</span>
//       </h1>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      router.push("/dashboard"); 
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div>Loading...</div>;
}

