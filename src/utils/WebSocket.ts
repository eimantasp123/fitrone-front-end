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
    // Add event listeners
    const ingredientUpdateHandler = () => {
      console.log("ingredient_updated_in_meals");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    };

    const customerFormHandler = () => {
      console.log("customer_form_confirmed");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    };

    webSocketInstance.addEventListener(
      "ingredient_updated_in_meals",
      ingredientUpdateHandler,
    );
    webSocketInstance.addEventListener(
      "customer_form_confirmed",
      customerFormHandler,
    );

    return () => {
      webSocketInstance.removeEventListener("ingredient_updated_in_meals");
      webSocketInstance.removeEventListener("customer_form_confirmed");
      webSocketInstance.disconnect();
    };
  }, [queryClient, isAuthenticated, userDetails?._id]);

  return null;
};

export default WebSocketListener;
