export interface Property {
  _id: string;
  property_title: string;
  property_location: string;
  property_size: string;
}

export interface Listing {
  property_type: string;
  property_price: number;
  current_market_value: number;
  status: string;
}

export interface Investment {
  _id: string;
  amount: number;
  investment_date: string;
  status: "active" | "withdrawn" | "completed";
  property: Property;
  listing: Listing;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}
