"use client";
import { Provider } from "react-redux";
import store from "./store";

interface StoreProvierProps {
  children: React.ReactNode;
}

export default function StoreProvier({ children }: StoreProvierProps) {
  return <Provider store={store}>{children}</Provider>;
}
