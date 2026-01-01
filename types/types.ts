export interface Property {
  _id: string;
  property_title: string;
  property_location: string;
  property_size: string;
}

export interface Listing {
    property_name: string;
    _id: any;
    total_investment: number;
  property_type: string;
  property_price: number;
  current_market_value: number;
  status: string;
property_posted_date:Date;
}

export interface Investment {
  _id: string;
  amount: number;
  investment_date: string;
  status: "active" | "withdrawn" | "completed" | "pending" | "approved" | "rejected";
  property: Property;
  listing: Listing;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}
export interface ProfitDistribution {
  _id: string;
  propertyId: string;
  totalProfit: number;
  hiveShare: number;
  investorShare: number;
  distributionDate: string;
}
export interface InvestorPayout {
  _id: string;
  profitDistributionId: string;
  investorId: string;
  investmentAmount: number;
  profitAmount: number;
  totalPayout: number;
}
export interface DistributionResponse {
  message: string;
  propertyId: string;
  totalProfit: number;
  hiveShare: number;
  investorShare: number;
}