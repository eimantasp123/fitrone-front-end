import AuthContext from "@/context/AuthContext";
import { useAppSelector } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import webSocketInstance from "./webSocketInstance";

/**
 *  WebSocketListener listens for WebSocket messages and invalidates queries based on the message type.
 */
const WebSocketListener: React.FC = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useContext(AuthContext);
  const { details: userDetails } = useAppSelector(
    (state) => state.personalDetails,
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!userDetails?._id) return;

    const WS_URL = `${import.meta.env.VITE_WS_URL}?userId=${userDetails._id}`;

    webSocketInstance.connect(WS_URL);

    // Add event listener for WebSocket messages
    webSocketInstance.addEventListener("ingredient_deleted_from_meals", () => {
      console.log("Ingredient deleted from meals");
      // queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    });

    // Add event listener for WebSocket messages
    webSocketInstance.addEventListener("ingredient_updated_in_meals", () => {
      console.log("Ingredient updated in meals");
      // queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    });

    return () => {
      webSocketInstance.disconnect();
    };
  }, [queryClient, isAuthenticated, userDetails?._id]);

  return null;
};

export default WebSocketListener;
