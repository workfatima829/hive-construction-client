"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/property/${id}`
                );
                setProperty(res.data.property);
                setListings(res.data.listings);
            } catch (err) {
                console.error(err);
                setError("Property not found");
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);
    if (loading) {
        return <p className="text-center py-10">Loading property details...</p>;
    }
    if (error || !property) {
        return (
            <p className="text-center text-red-500 py-10">
                {error || "Something went wrong"}
            </p>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <Button
                variant="outline"
                className="mb-4"
                onClick={() => router.back()}
            >
                ← Back
            </Button>
            <Card className="max-w-4xl mx-auto overflow-hidden">
                <img
                    src="/property.jpg"
                    alt={property.property_title}
                    className="h-96 w-full object-cover"
                />

                <CardContent className="p-8 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {property.property_title}
                        </h1>

                        <p className="text-muted-foreground mt-1">
                            📍 {property.property_location}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p><strong>Size:</strong> {property.property_size} sq ft</p>
                    </div>
                    <div className="border-t pt-6">
                        <h2 className="text-2xl font-semibold mb-4">
                            Listing Details
                        </h2>

                        {listings.length === 0 ? (
                            <p className="text-muted-foreground">
                                No listings available
                            </p>
                        ) : (
                            listings.map((listing) => (
                                <div
                                    key={listing._id}
                                    className="space-y-2 rounded-lg border p-4 mb-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <p>
                                            <strong>Type:</strong> {listing.property_type}
                                        </p>
                                        <Badge variant="secondary">
                                            {listing.status}
                                        </Badge>
                                    </div>

                                    <p>
                                        <strong>Price:</strong> PKR{" "}
                                        {listing.property_price.toLocaleString()}
                                    </p>

                                    {listing.current_market_value && (
                                        <p>
                                            <strong>Market Value:</strong> PKR{" "}
                                            {listing.current_market_value.toLocaleString()}
                                        </p>
                                    )}

                                    {listing.property_selling_date && (
                                        <p>
                                            <strong>Selling Date:</strong>{" "}
                                            {new Date(
                                                listing.property_selling_date
                                            ).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
