export type Medicine = {
  _id: string;
  nameAr: string;
  nameEn: string;
  category: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
  descriptionAr: string;
  descriptionEn: string;
  requirePrescription: boolean;
  dosage: string;
  imageUrl: string;
  price: number;
  form: string;
  internalQty: number;
  pricePerUnit: number;
  status: "ACTIVE" | "INACTIVE";
};
