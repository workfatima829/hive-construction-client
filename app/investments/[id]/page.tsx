// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Link from "next/link";

// interface PropertyDetail {
//   _id: string;
//   property_title: string;
//   property_location: string;
//   property_size: number;
//   property_description?: string;
//   property_type?: string;
//   property_price: number;
//   status?: string;
//   property_posted_date?: string;
//   property_selling_date?: string;
//   current_market_value?: number;
// }

// interface InvestmentDetail {
//   _id: string;
//   user_id: string;
//   property_id: string;
//   share_percentage: number;
//   profit_share: number;
//   investment_date?: string;
//   property: PropertyDetail;
// }

// export default function InvestmentDetailPage() {
//   const params = useParams();
//   const investmentId = params.id as string;
  
//   const [investment, setInvestment] = useState<InvestmentDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchInvestmentDetail = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/property/${investmentId}`
//         );
//         console.log("Investment Detail:", res.data);
//         setInvestment(res.data.data || res.data);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching investment details:", error);
//         setError("Failed to load investment details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (investmentId) {
//       fetchInvestmentDetail();
//     }
//   }, [investmentId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin">
//             <div className="w-12 h-12 border-4 border-blue-400 border-t-cyan-400 rounded-full"></div>
//           </div>
//           <p className="mt-4 text-gray-400">Loading investment details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-400 mb-4">{error}</p>
//           <Link href="/investments" className="text-blue-400 hover:text-blue-300 underline">
//             Back to Investments
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const prop = investment?.property as PropertyDetail | undefined;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
//       <div className="container mx-auto px-4">
//         {/* Back Button */}
//         <Link
//           href="/investments"
//           className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition"
//         >
//           <span className="mr-2">←</span> Back to Investments
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Property Title */}
//             <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
//               <h1 className="text-4xl font-bold text-white mb-4">
//                 {prop?.property_title}
//               </h1>
//               <div className="flex items-center gap-2 text-gray-400 mb-4">
//                 <span>📍</span>
//                 <p className="text-lg">{prop?.property_location}</p>
//               </div>
//               {prop?.property_description && (
//                 <p className="text-gray-300 leading-relaxed">
//                   {prop.property_description}
//                 </p>
//               )}
//             </div>

//               {prop?.property_size && (
//                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-center">
//                   <p className="text-gray-400 text-sm mb-1">Size</p>
//                   <p className="text-2xl font-bold text-blue-400">
//                     {prop.property_size.toLocaleString()} sq.ft
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Property Type & Status */}
//             <div className="grid grid-cols-2 gap-4">
//               {prop?.property_type && (
//                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
//                   <p className="text-gray-400 text-sm mb-2">Property Type</p>
//                   <p className="text-xl font-semibold text-white">
//                     {prop.property_type}
//                   </p>
//                 </div>
//               )}
//               {prop?.status && (
//                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
//                   <p className="text-gray-400 text-sm mb-2">Status</p>
//                   <p className="text-xl font-semibold text-green-400">
//                     {prop.status}
//                   </p>
//                 </div>
//               )}
//             </div>


//           {/* Sidebar - Investment Details */}
//           <div className="lg:col-span-1">
//             {/* Price Card */}
//             <div className="sticky top-8 space-y-4">
//               <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
//                 <p className="text-sm opacity-90 mb-1">Property Price</p>
//                 <p className="text-3xl font-bold mb-6">
//                   ${prop?.property_price?.toLocaleString() || "0"}
//                 </p>
//                 {prop?.current_market_value && (
//                   <div className="border-t border-white/20 pt-4 mt-4">
//                     <p className="text-sm opacity-90 mb-1">Current Market Value</p>
//                     <p className="text-2xl font-bold">
//                       ${prop.current_market_value.toLocaleString()}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Investment Details */}
//               <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-4">
//                 <h3 className="text-lg font-bold text-white mb-4">Your Investment</h3>
                
//                 <div>
//                   <p className="text-gray-400 text-sm mb-2">Your Share</p>
//                   <p className="text-2xl font-bold text-blue-400">
//                     {investment?.share_percentage || 0}%
//                   </p>
//                 </div>

//                 <div className="border-t border-slate-600 pt-4">
//                   <p className="text-gray-400 text-sm mb-2">Profit Share</p>
//                   <p className="text-2xl font-bold text-green-400">
//                     ${(investment?.profit_share || 0).toLocaleString()}
//                   </p>
//                 </div>

//                 {investment?.investment_date && (
//                   <div className="border-t border-slate-600 pt-4">
//                     <p className="text-gray-400 text-sm mb-2">Investment Date</p>
//                     <p className="text-white">
//                       {new Date(investment.investment_date).toLocaleDateString()}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Dates */}
//               {(prop?.property_posted_date || prop?.property_selling_date) && (
//                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-3">
//                   {prop?.property_posted_date && (
//                     <div>
//                       <p className="text-gray-400 text-sm mb-1">Posted Date</p>
//                       <p className="text-white text-sm">
//                         {new Date(prop.property_posted_date).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}
//                   {prop?.property_selling_date && (
//                     <div>
//                       <p className="text-gray-400 text-sm mb-1">Selling Date</p>
//                       <p className="text-white text-sm">
//                         {new Date(prop.property_selling_date).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }