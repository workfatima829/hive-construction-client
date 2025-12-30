"use client";

import { Building2, TrendingUp, Calendar, DollarSign, MapPin } from "lucide-react";
import { Investment } from "@/types/types";

interface InvestmentCardProps {
  investment: Investment;
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  const property = investment.propertyId;

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
      case "under_construction": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const potentialReturn = investment.listing 
    ? ((investment.listing.current_market_value - investment.listing.property_price) / investment.listing.property_price * 100).toFixed(2)
    : 0;

  if (!property) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Property data not available</p>
        <p className="text-xs text-red-600 mt-1">Investment ID: {investment._id}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {property.property_title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <MapPin size={16} />
            <span className="text-sm">{property.property_location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 size={16} />
            <span className="text-sm">{property.property_size} sq ft</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(investment.status)}`}>
            {investment.status.toUpperCase()}
          </span>
          {investment.listing && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPropertyStatusColor(investment.listing.status)}`}>
              {investment.listing.status.replace('_', ' ').toUpperCase()}
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
              {new Date(investment.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-gray-500 text-sm pt-4 border-t">
        <Calendar size={16} />
        <span>Invested on {new Date(investment.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
      </div>
    </div>
  );
}
