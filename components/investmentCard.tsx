"use client";

import { Building2, TrendingUp, Calendar, DollarSign, MapPin } from "lucide-react";
import { Investment } from "@/types/types";
interface InvestmentCardProps {
  investment: Investment;
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "withdrawn": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPropertyStatusColor = (status: string) => {
    switch (status) {
      case "sold": return "bg-purple-100 text-purple-700";
      case "available": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const potentialReturn = investment.listing 
    ? ((investment.listing.current_market_value - investment.listing.property_price) / investment.listing.property_price * 100).toFixed(2)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {investment.property.property_title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <MapPin size={16} />
            <span className="text-sm">{investment.property.property_location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 size={16} />
            <span className="text-sm">{investment.property.property_size}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(investment.status)}`}>
            {investment.status.toUpperCase()}
          </span>
          {investment.listing && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPropertyStatusColor(investment.listing.status)}`}>
              {investment.listing.status.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <DollarSign size={18} />
            <span className="text-sm font-medium">Your Investment</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            ${investment.amount.toLocaleString()}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <TrendingUp size={18} />
            <span className="text-sm font-medium">Potential Return</span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {potentialReturn}%
          </p>
        </div>
      </div>

      {investment.listing && (
        <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600 mb-1">Property Type</p>
            <p className="font-semibold text-gray-800 capitalize">
              {investment.listing.property_type}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Property Price</p>
            <p className="font-semibold text-gray-800">
              ${investment.listing.property_price.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Market Value</p>
            <p className="font-semibold text-gray-800">
              ${investment.listing.current_market_value.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Investment Date</p>
            <p className="font-semibold text-gray-800">
              {new Date(investment.investment_date).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-gray-500 text-sm pt-4 border-t">
        <Calendar size={16} />
        <span>Invested on {new Date(investment.investment_date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
      </div>
    </div>
  );
}






// // "use client";

// // import React from "react";

// // interface InvestmentCardProps {
// //   property: {
// //     _id: string;
// //     property_title: string;
// //     property_location: string;
// //     property_size: number;
// //     propertyListing?: {
// //       property_type: string;
// //       property_price: number;
// //       status: string;
// //       property_selling_date: string;
// //       property_posted_date: string;
// //       current_market_value: number;
// //     };
// //   };
// // }

// // export default function InvestmentCard({ property }: InvestmentCardProps) {
// //   const listing = property.propertyListing;

// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300">
// //       <h3 className="text-xl font-bold text-gray-900 mb-2">
// //         {property.property_title ?? "No Title"}
// //       </h3>
// //       <p className="text-gray-500 mb-1">{property.property_location ?? "No Location"}</p>
// //       <p className="text-gray-500 mb-3">Size: {property.property_size ?? 0} sq.ft</p>
// //       <p className="text-blue-600 font-semibold mb-1">
// //         Type: {listing?.property_type ?? "N/A"}
// //       </p>
// //       <p className="text-blue-600 font-semibold mb-1">
// //         Price: ${listing?.property_price?.toLocaleString() ?? 0}
// //       </p>
// //       <p className="text-gray-700 mb-1">Status: {listing?.status ?? "Unknown"}</p>
// //       <p className="text-gray-500 mb-1">
// //         Posted: {listing?.property_posted_date ?? "N/A"}
// //       </p>
// //       <p className="text-gray-500 mb-3">
// //         Selling Date: {listing?.property_selling_date ?? "N/A"}
// //       </p>
// //       <p className="text-green-600 font-semibold">
// //         Market Value: ${listing?.current_market_value?.toLocaleString() ?? 0}
// //       </p>
// //     </div>
// //   );
// // }

// "use client";

// import React from "react";
// import Link from "next/link";

// interface InvestmentCardProps {
//   property: {
//     _id: string;
//     property_title: string;
//     property_location: string;
//     property_size?: number;
//     property_price?: number;
//     share_percentage?: number;
//     profit_share?: number;
//     property_type?: string;
//     status?: string;
//     property_selling_date?: string;
//     property_posted_date?: string;
//     current_market_value?: number;
//     propertyListing?: {
//       property_type: string;
//       property_price: number;
//       status: string;
//       property_selling_date: string;
//       property_posted_date: string;
//       current_market_value: number;
//     };
//   };
// }

// export default function InvestmentCard({ property }: InvestmentCardProps) {
//   const listing = property.propertyListing || property;

//   return (
//     <Link href={`/investments/${property._id}`}>
//       <div className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-blue-400/50 h-full">
//         {/* Top Accent */}
//         <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition duration-300"></div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Title */}
//           <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition">
//             {property.property_title ?? "No Title"}
//           </h3>

//           {/* Location */}
//           <div className="flex items-center gap-2 mb-4 text-gray-400">
//             <span>📍</span>
//             <p className="text-sm">{property.property_location ?? "No Location"}</p>
//           </div>

//           {/* Size */}
//           {property.property_size && (
//             <p className="text-gray-400 text-sm mb-4">
//               📐 {property.property_size.toLocaleString()} sq.ft
//             </p>
//           )}

//           {/* Divider */}
//           <div className="border-t border-slate-700 my-4"></div>

//           {/* Property Type */}
//           {listing?.property_type && (
//             <div className="mb-3">
//               <p className="text-gray-400 text-xs mb-1">Property Type</p>
//               <p className="text-blue-400 font-semibold">{listing.property_type}</p>
//             </div>
//           )}

//           {/* Price */}
//           {property.property_price && (
//             <div className="mb-3">
//               <p className="text-gray-400 text-xs mb-1">Price</p>
//               <p className="text-white font-bold text-lg">
//                 ${property.property_price.toLocaleString()}
//               </p>
//             </div>
//           )}

//           {/* Status */}
//           {listing?.status && (
//             <div className="mb-3">
//               <p className="text-gray-400 text-xs mb-1">Status</p>
//               <p className="text-green-400 font-semibold">{listing.status}</p>
//             </div>
//           )}

//           {/* Market Value */}
//           {listing?.current_market_value && (
//             <div className="mb-4 pb-4 border-b border-slate-700">
//               <p className="text-gray-400 text-xs mb-1">Market Value</p>
//               <p className="text-green-400 font-bold">
//                 ${listing.current_market_value.toLocaleString()}
//               </p>
//             </div>
//           )}

//           {/* Investment Details */}
//           {property.share_percentage !== undefined && (
//             <div className="mb-3 bg-slate-700/30 rounded-lg p-3">
//               <p className="text-gray-400 text-xs mb-1">Your Share</p>
//               <p className="text-blue-400 font-bold text-lg">
//                 {property.share_percentage}%
//               </p>
//             </div>
//           )}

//           {property.profit_share !== undefined && (
//             <div className="bg-slate-700/30 rounded-lg p-3">
//               <p className="text-gray-400 text-xs mb-1">Profit Share</p>
//               <p className="text-green-400 font-bold text-lg">
//                 ${property.profit_share.toLocaleString()}
//               </p>
//             </div>
//           )}

//           {/* Click to View */}
//           <div className="mt-6 pt-4 border-t border-slate-700">
//             <p className="text-center text-blue-400 font-semibold text-sm group-hover:text-cyan-400 transition">
//               View Details →
//             </p>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }