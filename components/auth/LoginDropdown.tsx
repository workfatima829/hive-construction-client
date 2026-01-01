// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, X } from "lucide-react";
// import LoginForm from "./LoginForm";
// import RegistrationForm from "./RegistrationForm";

// export default function LoginDropdown() {
//   const [open, setOpen] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   const closeModal = () => {
//     setOpen(false);
//     setShowRegister(false);
//   };

//   return (
//     <>
//       <Button
//         size="lg"
//         className="group text-white px-8 py-4 text-lg rounded-lg border-0 transition-all duration-300 hover:scale-105 cursor-pointer"
//         style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
//         onClick={() => setOpen(true)}
//       >
//         Login
//         <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//       </Button>
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="relative w-[380px] rounded-2xl bg-gray-900 p-6 text-white shadow-2xl">
//             <button
//               onClick={closeModal}
//               className="absolute -top-4 -right-4 bg-gray-800 hover:bg-red-500 text-white p-2 rounded-full shadow-lg transition cursor-pointer"
//             >
//               <X size={18} />
//             </button>
//             <h2 className="text-2xl font-bold text-center mb-6">
//               {showRegister ? "Create Account" : "Welcome Back"}
//             </h2>
//             {!showRegister ? (
//               <>
//                 <LoginForm />
//                 <p className="text-sm text-center mt-4 text-gray-400">
//                   Don’t have an account?{" "}
//                   <button
//                     onClick={() => setShowRegister(true)}
//                     className="text-blue-400 hover:underline cursor-pointer"
//                   >
//                     Sign up
//                   </button>
//                 </p>
//               </>
//             ) : (
//               <>
//                 <RegistrationForm />
//                 <p className="text-sm text-center mt-4 text-gray-400">
//                   Already have an account?{" "}
//                   <button
//                     onClick={() => setShowRegister(false)}
//                     className="text-blue-400 hover:underline cursor-pointer"
//                   >
//                     Login
//                   </button>
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
 