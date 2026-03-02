"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "@/components/propertyCard";
import Navbar from "@/components/layout/Navbar";
import { Building2, ChevronLeft, ChevronRight, Loader2, ShieldCheck, TrendingUp } from "lucide-react";

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
  const propertyImages = [
    "/property.jpg",
    "/construction.jpg",
    "/renovation.jpg",
    "/restoration.jpg",
    "/consulting.jpg",
  ];

  const fetchProperties = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties?page=${pageNumber}&limit=9`
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

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProperties(nextPage);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-transparent z-10" />
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: 'url("/construction.jpg")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          </div>

          <div className="relative z-20 text-center px-6">
            <p className="inline-block mb-5 text-sm font-semibold tracking-[0.18em] uppercase text-white/85 border border-white/25 rounded-full px-4 py-2">
              Premium Residential Listings
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Find High-Potential Investment Properties
            </h1>
            <p className="text-white/85 text-base sm:text-lg max-w-3xl mx-auto">
              Browse verified Hive listings with transparent pricing, strong growth potential, and
              secure investment support.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 md:px-20 bg-secondary/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl shadow-md p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-slate-900/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Properties On This Page</p>
                <p className="text-2xl font-bold text-slate-900">{properties.length}</p>
              </div>
            </div>
            <div className="bg-card rounded-xl shadow-md p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-emerald-600/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Page</p>
                <p className="text-2xl font-bold text-slate-900">
                  {page} <span className="text-base font-medium text-slate-500">/ {totalPages}</span>
                </p>
              </div>
            </div>
            <div className="bg-card rounded-xl shadow-md p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-600/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Security Promise</p>
                <p className="text-lg font-bold text-slate-900">Investor-first protection</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-slate-700" />
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center bg-card rounded-xl shadow-md p-12">
                <h2 className="text-2xl font-semibold text-slate-900">No properties found</h2>
                <p className="text-muted-foreground mt-2">Please check back again soon.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((property, index) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      imageSrc={propertyImages[index % propertyImages.length]}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <span className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 font-medium">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || loading}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
