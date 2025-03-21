import AuthContext from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import webSocketInstance from "./webSocketInstance";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInterceptors";
import { setUserDetails } from "@/services/reduxSlices/Profile/personalDetailsSlice";

/**
 *  WebSocketListener listens for WebSocket messages and invalidates queries based on the message type.
 */
const WebSocketListener: React.FC = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, setAuthChecking, setIsAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    };

    const customerFormHandler = () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    };

    const subscriptionHandler = async () => {
      const response = await axiosInstance.get("/auth/user");
      dispatch(setUserDetails(response.data.user));
    };

    webSocketInstance.addEventListener(
      "ingredient_updated_in_meals",
      ingredientUpdateHandler,
    );
    webSocketInstance.addEventListener(
      "customer_form_confirmed",
      customerFormHandler,
    );
    webSocketInstance.addEventListener(
      "subscription_updated",
      subscriptionHandler,
    );

    return () => {
      webSocketInstance.removeEventListener("ingredient_updated_in_meals");
      webSocketInstance.removeEventListener("customer_form_confirmed");
      webSocketInstance.removeEventListener("subscription_updated");
      webSocketInstance.disconnect();
    };
  }, [
    queryClient,
    isAuthenticated,
    userDetails?._id,
    setAuthChecking,
    navigate,
    setIsAuthenticated,
    dispatch,
  ]);

  return null;
};

export default WebSocketListener;
