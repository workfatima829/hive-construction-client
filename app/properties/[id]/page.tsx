"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Maximize2, Calendar, TrendingUp, Tag } from "lucide-react";

type Property = {
    _id: string;
    property_title: string;
    property_location: string;
    property_size: number;
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
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/property/${id}`
                );
                const data = await res.json();
                setProperty(data.property);
                setListings(data.listings);
            } catch (err) {
                console.error(err);
                setError("Property not found");
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const getStatusVariant = (status: string) => {
        const statusLower = status.toLowerCase();
        if (statusLower === "available" || statusLower === "active") return "default";
        if (statusLower === "sold") return "secondary";
        if (statusLower === "pending") return "outline";
        return "secondary";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center space-y-4">
<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
 <p className="text-slate-600 font-medium">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <Card className="max-w-md w-full mx-4">
                    <CardContent className="pt-6 text-center space-y-4">
                        <h2 className="text-xl font-semibold text-slate-900">Property Not Found</h2>
                        <p className="text-slate-600">{error || "Something went wrong"}</p>
                        <Button onClick={() => router.back()} variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-6xl">
                <Button
                    variant="ghost"
                    className="mb-6 hover:bg-white"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Properties
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden shadow-lg border-0">
                            <div className="relative">
                                <img
                                    src="/property.jpg"
                                    alt={property.property_title}
                                    className="h-96 w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                                        {property.property_title}
                                    </h1>
                                    <div className="flex items-center gap-2 text-white/90">
                                        <MapPin className="w-5 h-5" />
                                        <span className="text-lg">{property.property_location}</span>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6 sm:p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Maximize2 className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 font-medium">Property Size</p>
                                            <p className="text-2xl font-bold text-slate-900 mt-1">
                                                {property.property_size.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-slate-500">square feet</p>
                                        </div>
                                    </div>

                                    {listings.length > 0 && (
                                        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <Tag className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-600 font-medium">Total Listings</p>
                                                <p className="text-2xl font-bold text-slate-900 mt-1">
                                                    {listings.length}
                                                </p>
                                                <p className="text-sm text-slate-500">available</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="shadow-lg border-0 sticky top-6">
                            <CardHeader className="pb-4 border-b">
                                <h2 className="text-2xl font-bold text-slate-900">Listing Details</h2>
                                <p className="text-sm text-slate-600">Available property listings</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {listings.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-3xl">📋</span>
                                        </div>
                                        <p className="text-slate-600 font-medium">No listings available</p>
                                        <p className="text-sm text-slate-500 mt-1">Check back later for updates</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                        {listings.map((listing, index) => (
                                            <Card key={listing._id} className="border-2 hover:border-primary transition-colors">
                                                <CardContent className="p-5 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-semibold text-slate-500">
                                                            LISTING #{index + 1}
                                                        </span>
                                                        <Badge variant={getStatusVariant(listing.status)} className="font-medium">
                                                            {listing.status}
                                                        </Badge>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-slate-600 mb-1">Property Type</p>
                                                        <p className="text-lg font-semibold text-slate-900">
                                                            {listing.property_type}
                                                        </p>
                                                    </div>

                                                    <div className="border-t my-3"></div>

                                                    <div>
                                                        <p className="text-sm text-slate-600 mb-1">Listed Price</p>
                                                        <p className="text-2xl font-bold text-primary">
                                                            PKR {listing.property_price.toLocaleString()}
                                                        </p>
                                                    </div>

                                                    {listing.current_market_value && (
                                                        <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                                                            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                            <div>
                                                                <p className="text-xs font-medium text-green-800">Market Value</p>
                                                                <p className="text-lg font-bold text-green-900">
                                                                    PKR {listing.current_market_value.toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {listing.property_selling_date && (
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>
                                                                {new Date(listing.property_selling_date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </span>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
