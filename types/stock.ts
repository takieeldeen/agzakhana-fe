import { LocalizedObject } from "./common";

export interface StockListItem {
  id: number;
  imageUrl?: string;
  nameAr: string;
  nameEn: string;
  category: LocalizedObject;
  quantity: number;
  price: number;
  status: "LOW" | "AVERAGE" | "HIGH";
}
