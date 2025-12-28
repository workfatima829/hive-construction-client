// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import PropertyCard from "@/components/propertyCard";
// interface Property {
//   _id: string;
//   property_title: string;
//   property_location: string;
//   property_price: number;
// }

// export default function PropertiesPage() {
//   const [properties, setProperties] = useState<Property[]>([]);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/properties`
//         );
//         setProperties(res.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center mb-16">
//           <div className="inline-block mb-6">
//             <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/20">
//               All Properties
//             </span>
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
//             Discover Your Dream Home
//           </h1>
//           <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
//             Explore our handpicked collection of premium properties in prime locations. Each listing represents quality, value, and exceptional living experiences.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {properties.map((property, index) => (
//             <div
//               key={property._id}
//               className="group relative"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500 -z-10"></div>
//               <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden transition duration-500 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:border-blue-400/50 h-full">
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
//                 <PropertyCard property={property} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty state */}
//         {properties.length === 0 && (
//   <div className="flex items-center justify-center py-20">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    
//   </div>
// )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "@/components/propertyCard";

interface Property {
  _id: string;
  property_title: string;
  property_location: string;
  property_price: number;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties?page=${pageNumber}&limit=10`
      );
      setProperties(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/20">
              All Properties
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400">
            Discover Your Dream Home
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore our handpicked collection of premium properties in prime locations. Each listing represents quality, value, and exceptional living experiences.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-white">
            No properties found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => (
                <div
                  key={property._id}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient background effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500 -z-10"></div>
                  
                  {/* Card wrapper */}
                  <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden transition duration-500 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:border-blue-400/50 h-full">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    
                    <PropertyCard property={property} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-3">
              <button
                onClick={() => fetchProperties(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-white">{page} / {totalPages}</span>
              <button
                onClick={() => fetchProperties(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
