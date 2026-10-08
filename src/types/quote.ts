export type QuoteCoords = {lat: number; lng: number};

export type QuoteTab = "asap" | "schedule" | "pooling";

export interface QuoteVariant {
  variantId: string;
  maxLoadKg: number;
  asapPrice: number | null;
  scheduledPrice: number | null;
  poolingPrice: number | null;
}

export interface QuoteVehicle {
  vehicleTypeId: string;
  key: string;
  name: string;
  imageUrl: string;
  variants: QuoteVariant[];
}

export interface PublicQuoteResponse {
  distanceKm: number;
  bookingTypes: Record<QuoteTab, boolean>;
  vehicles: QuoteVehicle[];
}

export interface PublicQuoteRequest {
  pickUp: {coords: QuoteCoords; placeId: string; address?: string};
  dropOff: {coords: QuoteCoords; placeId: string; address?: string};
  recaptchaToken: string;
}

export interface RecommendedVariant {
  vehicleTypeId: string;
  variantId: string;
}
