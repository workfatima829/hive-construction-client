import { z } from "zod";

export const propertySchema = z.object({
  property_title: z.string().min(3, "Title must be at least 3 characters"),
  property_location: z.string().min(3, "Location must be at least 3 characters"),
  property_size: z.number().min(1, "Size must be greater than 0"),
  property_type: z.enum(["Residential", "Commercial", "Plot"]),
  property_price: z.number().min(1, "Price must be greater than 0"),
  current_market_value: z.number().optional(),
  property_selling_date: z.string().optional(),
});
