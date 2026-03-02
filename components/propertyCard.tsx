"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";

interface PropertyCardProps {
  property: {
    _id: string;
    property_title: string;
    property_location: string;
    property_price?: number;
  };
  imageSrc?: string;
}

export default function PropertyCard({ property, imageSrc = "/property.jpg" }: PropertyCardProps) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition duration-300 bg-white h-full flex flex-col">
      <div className="relative h-52 bg-gray-200">
        <img
          src={imageSrc}
          alt={property.property_title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
          Residential Listing
        </div>
      </div>

      <CardContent className="p-5 space-y-4 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold text-slate-900 leading-tight">
          {property.property_title}
        </h2>

        <div className="flex items-center gap-2 text-slate-500">
          <MapPin className="h-4 w-4" />
          <p className="text-sm">{property.property_location}</p>
        </div>

        {typeof property.property_price === "number" && (
          <div className="pt-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">Starting Price</p>
            <p className="text-2xl font-bold text-slate-900">
              PKR {property.property_price.toLocaleString()}
            </p>
          </div>
        )}

        <Button
          className="w-full mt-auto text-white px-4 py-4 rounded-lg border-0 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
          onClick={() => {
            router.push(`/properties/${property._id}`, { scroll: true });
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
