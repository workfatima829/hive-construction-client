"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PropertyCard({ property }: any) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition bg-white text-[oklch(70.5%_0.213_47.604)]">
      <div className="h-52 bg-gray-200">
        <img
          src="/property.jpg"
          alt={property.property_title}
          className="h-full w-full object-cover"
        />
      </div>

      <CardContent className="p-5 space-y-3">
        <h2 className="text-xl font-semibold">
          {property.property_title}
        </h2>

        <p className="text-gray-500">{property.property_location}</p>

        <Button
           className="group text-white px-4 py-4  rounded-lg border-0 transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
          onClick={() => router.push(`/properties/${property._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
