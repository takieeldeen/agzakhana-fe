import { LocalizedObject } from "./common";

export type BranchType = {
  id: string; // Unique identifier for the branch
  branchCode: string; // Short, user-friendly code for the branch
  name: string; // Name of the branch
  address: string; // Full address of the branch
  city: string; // City or region where the branch is located
  location: [number, number]; // Latitude and longitude for mapping
  googleUrl: string; // Link to the branch's location on Google Maps
  phoneNumber: string; // Primary contact number for the branch
  email: string; // Email address for inquiries
  managerName: string; // Name of the branch manager
  openingHour: string; // Opening hour (e.g., 9 for 9:00 AM)
  closingHour: string; // Closing hour (e.g., 17 for 5:00 PM)
  workingDays: string[]; // Days the branch operates (e.g., ["Sunday", "Monday"])
  status: "OPEN" | "CLOSED" | "VACATION" | "BREAK"; // Status of the branch
  distance: number;
};

export type BranchLocation = {
  location: {
    country: string;
    city: LocalizedObject;
    address: LocalizedObject;
    lat: number;
    lng: number;
  };
};
