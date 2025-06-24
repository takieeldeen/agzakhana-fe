"use client";
import { useEffect } from "react";
import { dispatchCheckAuthentication } from "../store/slices/auth/slice";
import { useAppDispatch } from "../store/store";

export default function AuthChecker() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dispatchCheckAuthentication());
    console.log("triggered Check Authentication");
  }, [dispatch]);
  return null;
}
