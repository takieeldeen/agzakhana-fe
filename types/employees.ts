export type Employee = {
  _id: string;
  name: string;
  imageUrl: string;
  code: string;
  currentBranch?: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE" | "OFFLINE" | "INVITED";
};
