"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Calendar, MapPin, ShieldCheck, TrendingUp } from "lucide-react";

type Property = {
  _id: string;
  property_title: string;
  property_location: string;
  property_size?: number | string;
};

type Listing = {
  _id: string;
  property_type: string;
  property_price: number;
  current_market_value?: number;
  status: string;
  property_selling_date?: string;
};

export default function PropertyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchPropertyDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/${id}`);
        const data = await res.json();
        setProperty(data.property);
        setListings(data.listings || []);
      } catch (err) {
        console.error(err);
        setError("Property not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, [id]);

  const availableCount = listings.filter((x) => ["available", "active"].includes(x.status.toLowerCase())).length;
  const lowestPrice = useMemo(() => {
    if (!listings.length) return null;
    return Math.min(...listings.map((x) => x.property_price));
  }, [listings]);

  const highestMarket = useMemo(() => {
    const values = listings.map((x) => x.current_market_value).filter((v): v is number => typeof v === "number");
    if (!values.length) return null;
    return Math.max(...values);
  }, [listings]);

  const getStatusClasses = (status: string) => {
    const s = status.toLowerCase();
    if (s === "available" || s === "active") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (s === "pending") return "bg-amber-50 text-amber-700 border border-amber-200";
    if (s === "sold") return "bg-slate-100 text-slate-700 border border-slate-200";
    return "bg-slate-100 text-slate-700 border border-slate-200";
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 mx-auto rounded-full border-4 border-slate-300 border-t-slate-700 animate-spin" />
            <p className="mt-3 text-slate-600">Loading property details...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-md p-8 text-center border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Property Not Found</h2>
            <p className="text-slate-600 mt-2">{error || "Something went wrong."}</p>
            <Button
              className="mt-6 text-white"
              style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
              onClick={() => router.push("/properties")}
            >
              Back to Properties
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/30 z-10" />
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url("/construction.jpg")' }} />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
            <p className="mt-8 text-white/80 uppercase tracking-[0.14em] text-xs sm:text-sm">Property Overview</p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
              {property.property_title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-white/90">
              <MapPin className="h-5 w-5" />
              <span className="text-base sm:text-lg">{property.property_location}</span>
            </div>
            <button
              onClick={() => router.push("/properties")}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 px-4 py-2 text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Properties
            </button>
          </div>
         
        </section>

        <section className="py-12 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900">Listing Details</h2>
                  <p className="text-sm text-slate-500 mt-1">Available units and pricing information</p>
                </div>

                <div className="p-6 space-y-5">
                  {listings.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
                      <p className="font-semibold text-slate-900">No listings available yet</p>
                      <p className="text-sm text-slate-500 mt-1">Please check again later for updates.</p>
                    </div>
                  ) : (
                    listings.map((listing) => (
                      <article key={listing._id} className="rounded-xl border border-slate-200 p-5 hover:shadow-sm transition">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-xl font-bold text-slate-900">{listing.property_type}</h3>
                          <Badge className={getStatusClasses(listing.status)}>{listing.status}</Badge>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                            <p className="text-xs uppercase tracking-wide text-slate-500">Listed Price</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900">
                              PKR {listing.property_price.toLocaleString()}
                            </p>
                          </div>

                          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                            <p className="text-xs uppercase tracking-wide text-emerald-700">Market Value</p>
                            <p className="mt-1 text-2xl font-bold text-emerald-900">
                              {listing.current_market_value
                                ? `PKR ${listing.current_market_value.toLocaleString()}`
                                : "Not available"}
                            </p>
                          </div>
                        </div>

                        {listing.property_selling_date ? (
                          <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="h-4 w-4" />
                            Selling Date:{" "}
                            {new Date(listing.property_selling_date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        ) : null}
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900">Investment Snapshot</h3>
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Lowest Entry</span>
                      <span className="font-semibold text-slate-900">
                        {lowestPrice ? `PKR ${lowestPrice.toLocaleString()}` : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Highest Market Value</span>
                      <span className="font-semibold text-slate-900">
                        {highestMarket ? `PKR ${highestMarket.toLocaleString()}` : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Active Listings</span>
                      <span className="font-semibold text-emerald-700">{availableCount}</span>
                    </div>
                  </div>

                  <Button
                    className="mt-6 w-full text-white"
                    style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
                    onClick={() => router.push("/properties")}
                  >
                    Explore More Properties
                  </Button>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Investor Protection</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Hive tracks projects with transparent reporting and structured security policies.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Growth Visibility</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Compare listed price and market value to assess projected performance.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Project Quality</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Residential developments are monitored through each construction stage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
