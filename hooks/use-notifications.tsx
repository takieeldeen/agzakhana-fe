"use client";
import { useEffect } from "react";
import io from "socket.io-client";

const useNotifications = () => {
  const notificationServer = io("http://localhost:8081");
  useEffect(() => {
    notificationServer.on("pushNotifications", (data) => {
      console.log(data);
      return () => notificationServer.off("pushNotifications");
    });
  }, [notificationServer]);
};
export default useNotifications;
